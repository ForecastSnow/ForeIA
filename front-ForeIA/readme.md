# 💻 ForeIA Frontend (SPA)

## Primera versión del rediseño

Interfaz en azul, gris y cian, con tema oscuro por defecto, opción de tema claro, favicon SVG propio, sugerencias que completan el editor, historial con búsqueda, confirmación al eliminar y diseño adaptable a móviles. El chat conserva los saltos de línea, presenta bloques de código y permite copiar respuestas. Enter envía; Shift + Enter añade una línea. Los estados de espera explican que las respuestas pueden tardar porque se trata de una demo con recursos limitados.

Para revisarlo localmente, copia `.env-example` a `.env` si todavía no tienes configuración y ejecuta `npm run dev`. Abre `http://127.0.0.1:5173/app` para usar la API o `/preview` para explorar la interfaz sin iniciar sesión. El proxy de desarrollo usa `VITE_API_PROXY_TARGET`, conserva la autenticación en el mismo origen y no requiere cambiar Docker ni el CORS del servidor. En producción, configura `VITE_APIURL` con la URL pública del backend; el proxy de Vite solo está disponible durante el desarrollo.

Validación: `npm run build` y `npm run lint`.

El **Front-ForeIA** es la **interfaz de usuario** del ecosistema **ForeIA**, una demo técnica inspirada en ChatGPT/Gemini.  
Se trata de una **Single Page Application (SPA)** desarrollada con **Vite + React + TypeScript**, que permite interactuar con el **Orchestrator API** y el microservicio de IA **IANucle**.

> 🧭 Proyecto de carácter técnico, centrado en demostrar la integración entre frontend, backend y microservicios de IA.

---

## ✨ Descripción general

Esta interfaz ofrece una experiencia conversacional tipo chat, gestionando usuarios, sesiones e historial de conversaciones con la IA.  
El objetivo fue construir un **entorno funcional, responsivo y completamente operativo**, priorizando la comunicación fluida con el backend.

🔹 **Front-ForeIA** → se comunica con → **Orchestrator API** → que orquesta → **IANucle (Microservicio de IA)**.

---

## ⚙️ Stack tecnológico

- ⚛️ **React 19** con **TypeScript**
- ⚡ **Vite** (entorno de desarrollo moderno)
- 🎨 **TailwindCSS** + **Tailwind Scrollbar**
- 🔁 **TanStack React Query** para manejo de estado remoto
- 🚦 **React Router DOM 7**
- 🍬 **SweetAlert2** para alertas visuales
- 🧩 **vite-plugin-svgr** para SVG como componentes
- 🧹 **ESLint + TypeScript ESLint** para control básico de calidad

---

## 🧱 Arquitectura y consideraciones

El frontend sigue una estructura sencilla y funcional.  
Se priorizó la **rapidez de desarrollo** y la **integración estable con el backend**, por sobre la perfección arquitectónica.

> ⚠️ **Nota técnica:** El proyecto es funcional y mantiene buenas prácticas básicas, pero **aún presenta deudas técnicas** en organización y separación de responsabilidades.  
> No pretende ser un ejemplo de arquitectura avanzada de React, sino una demostración de un flujo completo entre capas de un ecosistema IA.

**Flujo general:**

1. El usuario interactúa desde la SPA.  
2. Las peticiones se envían al **Orchestrator API** mediante `VITE_APIURL`.  
3. El backend procesa, valida sesión y comunica con **IANucle** si es necesario.  
4. La respuesta es devuelta y renderizada en tiempo real.

---

## ⚡ Configuración rápida

### 1️⃣ Clonar el repositorio


``` git clone https://github.com/tuusuario/front-ForeIA.git ```

``` cd front-ForeIA ```

### 2️⃣ Instalar dependencias

``` npm install ```

### 3️⃣ Crear archivo .env

En la raíz del proyecto:

VITE_APIURL=URL DEL BACKEND

Debe apuntar al backend ForeIA Orchestrator API en ejecución.

4️⃣ Iniciar entorno de desarrollo

``` npm run dev ```

Por defecto, la aplicación estará en:

http://localhost:5173

## 🧩 Ecosistema completo

flowchart = [Frontend] --> [Orquestador API] --> [IANucle - Microservicio de IA] --> [Modelo Llama 3.2 Instruct 3B]

## 🚀 Despliegue

El proyecto está preparado para ser desplegado en Vercel u otros entornos compatibles con Vite.

La configuración se gestiona mediante variables de entorno y no expone credenciales en el código fuente.

## ⚙️ Se recomienda ejecutar el backend y microservicio antes del despliegue final para garantizar el flujo completo.

## 📄 Licencia

Distribuido bajo la MIT License.
Libre para uso, modificación y distribución con atribución.

## 👤 Nota del autor

Este frontend forma parte del ecosistema ForeIA, junto con el Orchestrator API y el microservicio IANucle.
Aunque funcional y responsive, este módulo no busca destacar por su arquitectura interna, sino por integrar correctamente las capas del sistema.
Fue desarrollado de forma individual como ejercicio técnico de integración fullstack con IA.
