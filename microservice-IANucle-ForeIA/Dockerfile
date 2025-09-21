FROM nvidia/cuda:13.0.1-cudnn-runtime-ubi9

WORKDIR /app

RUN dnf update -y && dnf install -y python3 python3-pip

RUN pip3 install torch torchvision --index-url https://download.pytorch.org/whl/cu129

COPY requeriments.txt .

RUN pip3 install --no-cache-dir -r requeriments.txt

COPY . .

EXPOSE 3000

CMD ["gunicorn", "-w", "1", "-b", "0.0.0.0:3000", "-t", "180",  "main:app"]

