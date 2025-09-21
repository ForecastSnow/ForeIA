# 🌐 ForeIA Orchestrator API

El **Orchestrator API** es el backend principal del proyecto **ForeIA**, una demo técnica inspirada en ChatGPT/Gemini.  
Se encarga de **gestionar usuarios, manejar chats y orquestar la comunicación con el microservicio de IA (IANucle)**.

**Nota del Autor:** Este proyecto fue diseñado, desarrollado e implementado en su totalidad por **una sola persona**, demostrando comprensión de la arquitectura de microservicios, optimización de LLM y despliegue seguro.

> 💡 Diseñado con arquitectura modular y prácticas de producción para demostrar habilidades de **backend, seguridad, diseño de APIs y microservicios**.

---

## ✨ Características principales

- 👤 **Gestión de usuarios**: registro seguro con `bcrypt`, autenticación con **JWT** (72hs de duración).  
- 💬 **Gestión de chats**: creación, persistencia en **MongoDB**, recuperación de historial y administración de estado.  
- 🤝 **Orquestación de IA**: el servicio conecta con **IANucle**, que procesa las peticiones de texto.  
- 🔒 **Seguridad**:  
  - JWT de **vida corta** para comunicación con microservicios.  
  - JWT de usuario con expiración de **72hs**.  
- 🛠️ **Validación de datos**: mediante DTOs con `yup`.  
- 🗄️ **Arquitectura repository**: separación clara entre controladores, servicios y persistencia.  
- 🌐 **Express + Mongoose**: moderno, rápido y escalable.

---

## ⚙️ Stack tecnológico

- **Lenguaje:** JavaScript (Node.js)  
- **Framework:** Express
- **Base de datos:** MongoDB (con Mongoose)  
- **Autenticación:** JWT + bcrypt  
- **Validación:** Yup (DTOs)  
- **Infraestructura Serverless** Servicio Hosteado (Vercel/Cloudflare Workers) 
- **Arquitectura:** Repository Pattern  

---

## 🔌 Endpoints principales

### 🔑 Autenticación y usuarios

| Método | Endpoint                 | Descripción                                            |
|--------|--------------------------|--------------------------------------------------------|
| `POST` | `/api/createUser`        | Crea un nuevo usuario (registro).                      |
| `POST` | `/api/login`             | Autentica al usuario y devuelve un JWT válido.         |

### 📊 Estado

| Método | Endpoint                 | Descripción                                            |
|--------|--------------------------|-------------                                           |
| `GET`  | `/api/status`            | Estado del orquestador.                                |
| `GET`  | `/api/texiastatus`       | Estado del microservicio de IA (IANucle).              |

### 💬 Chats

| Método | Endpoint                 | Descripción                                            |
|--------|--------------------------|--------------------------------------------------------|
| `POST` | `/api/chat/create`       | Crea un nuevo chat enviando un mensaje inicial         |
| `POST` | `/api/chat/message`      | Envía un mensaje y recibe respuesta desde la IA.       |
| `GET`  | `/api/chat/getall`       | Obtiene todos los chats del usuario autenticado.       |
| `GET`  | `/api/chat/:idchat`      | Recupera un chat por ID.                               |
| `PUT`  | `/api/chat/:idchat`      | Deshabilita un chat por ID.                            |

---

## 🏗️ Flujo de arquitectura
  
1. Recibe las peticiones desde el **frontend**.  
2. Valida usuarios, permisos y estado de sesión.  
3. Enruta la petición hacia **IANucle** si involucra IA.  
4. Persiste la conversación en **MongoDB**.  
5. Devuelve la respuesta al frontend.  


flowchart = [Frontend] --> [Orquestador API] --> [IANucle - Microservicio de IA] --> [Modelo Llama 3.2 Instruct 3B]

---

⚙️ Configuración rápida

Este servicio utiliza variables de entorno para manejar credenciales y conexiones.
En el repositorio encontrarás un archivo env-example con las claves necesarias.

📌 Este servicio fue diseñado para ejecutarse en Vercel, donde cada push al repositorio genera un despliegue automático.
La seguridad y configuración se gestionan con variables de entorno desde el panel de Vercel, lo que evita exponer credenciales en el código.
Dejo un env-example para tener una guia rapida de como llenarlos para un despliegue

---

📄 Licencia El código fuente del proyecto se distribuye bajo la MIT License.

