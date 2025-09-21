# 🧠 IANucle – Microservicio de IA para ForeIA

**IANucle** es el microservicio destinado a gestionar la inteligencia artificial dentro del proyecto. **ForeIA** una demo tecnica inspirada en ChatGPT/Gemini.  
Este componente se encarga exclusivamente de **generar y procesar texto** utilizando un modelo de lenguaje local, optimizado para correr en hardware modesto con técnicas de **cuantización a 8 bits**.

**Nota del Autor:** Este proyecto fue diseñado, desarrollado e implementado en su totalidad por **una sola persona**, demostrando una completa comprensión de la arquitectura de microservicios, optimización de LLM y despliegue seguro.

⚡ Diseñado para demostrar cómo una arquitectura profesional de IA puede funcionar incluso con recursos limitados.

---

## ✨ Características principales

- 🚀 **Microservicio independiente**: diseñado en **Flask**, desplegado en producción con **Gunicorn**.  
- 🧩 **Integración vía orquestador**: IANucle no expone lógica de negocio; solo responde a peticiones del backend principal de ForeIA.  
- 🤖 **Modelo local**: `Llama 3.2 Instruct 3B FP16` cuantizado a 8 bits, servido desde https://huggingface.co/context-labs/meta-llama-Llama-3.2-3B-Instruct-FP16.  
- 🔒 **Seguridad por tokens JWT**: el orquestador genera y valida tokens; IANucle solo atiende requests autenticados.  
- 🌐 **Despliegue en entorno real**: servidor casero, con túneles seguros vía **Cloudflare Zero Trust**.  
- ⚙️ **Optimización** con `transformers`, `bitsandbytes`, `accelerate` y `optimum` para correr en hardware limitado.

---

## ⚙️ Stack tecnológico

- **Lenguaje:** Python 3  
- **Framework:** Flask + Gunicorn  
- **IA & NLP:** Transformers, Accelerate, BitsAndBytes, Optimum  
- **Infraestructura:** Cloudflare Tunnel (Zero Trust)  
- **Autenticación:** JWT firmado desde orquestador  
- **Hardware objetivo:** (6GB VRAM)

---

## 🔌 Endpoints principales

Todos los endpoints responden en **JSON**.  
El middleware espera un **token JWT válido en `request.cookies["Authorization"]`**.

| Método | Endpoint                  | Descripción                                                                          |
| ------ | ------------------------- | ------------------------------------------------------------------------------------ |
| `GET`  | `/textiastatus`           | Estado del microservicio de IA.                                                      |
| `POST` | `/message`                | Genera una respuesta del modelo según el `message` y el historial de `conversation`. |
| `POST` | `/chatNameGenerator`      | Genera un nombre para el chat basándose en la conversación.                          |
| `POST` | `/chatResume`             | Genera un resumen de la conversación.                                                |
| `GET`  | `/foreianucle/api/status` | Respuesta básica de estado: `{"message": "hello there"}`.                            |



## 🏗️ Arquitectura en contexto

IANucle no vive aislado: es uno de los microservicios que conforman **ForeIA**.  

flowchart = [Frontend] --> [Orquestador API] --> [IANucle - Microservicio de IA] --> [Modelo Llama 3.2 Instruct 3B]

---

## 📚 Roadmap

- 🔧 Soporte para múltiples modelos configurables por variable de entorno.   
- ⚡ Inferencia optimizada con ONNX Runtime.  
- 🔐 gestión de tokens.

---

## 📄 Licencia

El codigo fuente del proyecto se distribuye bajo la **MIT License**.  
El modelo base que se utiliza: *[Llama 3.2 Instruct 3B](https://huggingface.co/context-labs/meta-llama-Llama-3.2-3B-Instruct-FP16.)*, tiene su propia licencia y debe ser respetada segun los terminos de META.  

---

💡 *IANucle demuestra cómo es posible diseñar un microservicio de IA escalable y seguro incluso en un entorno de recursos limitados.*

---

## 📦 Instrucciones de despliegue

Este microservicio está preparado para correr en contenedores **Docker**, con soporte para **docker-compose** y configuración mediante **.env**.

### 1️⃣ Configurar variables de entorno

- Copiar el archivo `env-example` y renombrarlo a `.env`.
- Completar los valores necesarios.  
- La variable más importante es el **token de conexión de Cloudflare Tunnel**, que permite exponer el servicio de manera segura.  
- El resto de las variables ya tienen instrucciones en el archivo `env-example`.

### 2️⃣ Construir la imagen y levantar con docker-compose

- Ejecutar en la raíz del proyecto: docker-compose up -d


- El microservicio quedará operativo y accesible a través del túnel de Cloudflare Zero Trust.

