from ..common.iaTextModel import IaTextModel


class AiTextService:
    def __init__(self):
        self.iaModel = IaTextModel()
        pass
    
    def status(self):
        return self.iaModel.generateText([{"role": "user", "content": f"Debes decir 'estoy operarivo' y contar un dato curioso la respuesta debe ser corta "}])
    
    def message(self, message, conversation):
        
        if conversation is None:
            inputMessages = [{"role": "user", "content": f"Eres un agente de IA que responde en españoldebes responder de forma corta al siguiente mensaje: {message}" }]
        else:
            inputMessages = [{"role": "user", "content": f"Eres un agente de IA que responde en español, teniendo en cuenta la conversacion que llevas {conversation} debes responder de forma corta al siguiente mensaje: {message}" }]
        
        return self.iaModel.generateText(inputMessages)
    
    def chatNameGenerator(self, conversation):
        return self.iaModel.generateText([{"role": "user", "content": f"Genera un índice con 3 palabras clave para esta conversación. Las palabras deben estar separadas únicamente por comas y no debe haber texto adicional. Ejemplo de formato: [palabra1,palabra2,palabra3]. Conversación: {conversation}"
        }])
    
    def chatResumeGenerator(self, conversation):
        return self.iaModel.generateText([{"role": "user", "content": f"tu tarea es extraer los hechos clave de esta {conversation}. Enfócate en temas y datos clave. NO incluyas saludos, explicaciones sobre tu función o formato adicional. extraccion:"}])
    