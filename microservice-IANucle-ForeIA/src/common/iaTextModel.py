import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
import os
from dotenv import load_dotenv

load_dotenv()

print("cargando modelo de texto aguarde.")

modelId = os.getenv("MODEL_TEXT_ID")

localCache= f"./src/common/modelsIA/{modelId}/"

quantization_configs = {
    4: BitsAndBytesConfig(
        load_in_4bit=True,
        bnb_4bit_use_double_quant=True,
        bnb_4bit_quant_type="nf4",
        bnb_4bit_compute_dtype=torch.bfloat16
    ),
    8: BitsAndBytesConfig(
        load_in_8bit=True,
        bnb_4bit_compute_dtype=torch.bfloat16
    )
}

model = AutoModelForCausalLM.from_pretrained(
    modelId,
    quantization_config = quantization_configs.get(int(os.getenv("QUANTIZATION_CONFIG"))),
    device_map="auto",
    trust_remote_code=True
)

model = torch.compile(model)

tokenizer = AutoTokenizer.from_pretrained(modelId,trust_remote_code=True, use_fast=True )

tokenizer.pad_token = tokenizer.eos_token

#tokenizer.padding_side = "left"

model.save_pretrained(localCache)

tokenizer.save_pretrained(localCache)

class IaTextModel:
    
    def __init__(self):
        self.model = model
        self.tokenizer = tokenizer
        
    def generateText(self, inputMessages):
        
        formattedMessages = self.tokenizer.apply_chat_template(
            inputMessages,
            add_generation_prompt=True,
            tokenize=False
            )
        
        inputs = self.tokenizer(
            formattedMessages,
            padding=True,
            return_tensors="pt"
            )
        
        inputs = inputs.to(self.model.device)
        
        outputs = model.generate(
            **inputs,
            max_new_tokens=256,
            do_sample=True,
            temperature=0.6,
            #top_p=0.9,
            pad_token_id=self.tokenizer.eos_token_id
            )
        response = self.tokenizer.decode((outputs[0, inputs['input_ids'].shape[1]:]), skip_special_tokens=True)
            
        torch.cuda.empty_cache()

        return response