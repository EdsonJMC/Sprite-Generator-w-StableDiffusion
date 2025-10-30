# Proyecto: Generador de Assets con IA (Prototipo de I+D)

Este repositorio contiene el código fuente de un prototipo funcional (MVP) para una aplicación web que genera *assets* creativos (como *pixel art*, *sprites* o texturas) utilizando la API de [Replicate](https://replicate.com/) para acceder a modelos de IA generativa.

El objetivo principal de este proyecto no es ser un producto finalizado, sino actuar como una **Prueba de Concepto (PoC)** y una pieza de portafolio que demuestra la capacidad de:
1.  Integrar rápidamente tecnologías de IA de vanguardia.
2.  Construir un prototipo *full-stack* (React + Backend seguro).
3.  Aprender y aplicar nuevos conceptos de arquitectura de software.

---

### 🚀 Demo en Vivo

*[Aquí pondrás un enlace a la app desplegada (Vercel/Netlify) o, mejor aún, un GIF o un enlace a un video de Loom de 1 minuto mostrándolo en acción.]*

![Demo Placeholder](https://via.placeholder.com/600x300.png?text=Inserta+un+GIF+o+Video+Demo+Aquí)

(Me quede sin creditos para la generacion de imagen, cuando recargue mas actualizare la DEMO)

---

### 🛠️ Arquitectura y Stack Tecnológico

Este prototipo utiliza una arquitectura moderna para garantizar que las llaves de API secretas nunca queden expuestas en el *frontend*.

1.  **Frontend:**
    * **Framework:** [**React** (con Vite) / **SvelteKit** / El que hayas usado]
    * **Descripción:** Una interfaz de usuario limpia y simple que recopila el *prompt* del usuario y las opciones. Se encarga de mostrar la imagen generada.

2.  **Backend:**
    * **Framework:** [**Node.js (Serverless Function)** en Vercel/Netlify / **Express.js** / El que hayas usado]
    * **Descripción:** Un solo *endpoint* de API que actúa como intermediario. El *frontend* le envía el *prompt* a este *endpoint*.
    * **Seguridad:** Este *backend* es el **único** que tiene la `API_KEY` secreta. Recibe la petición, añade la llave de forma segura y llama a la API de Replicate.

3.  **Inteligencia Artificial:**
    * **Servicio:** [**Replicate.com**]
    * **Descripción:** Se utiliza la API de Replicate para acceder a modelos de IA pre-entrenados (como Stable Diffusion) especializados en la generación de imágenes.

---

### 📋 Estado del Proyecto: Prototipo Funcional

El sistema funciona de principio a fin: un usuario puede escribir un *prompt* y recibir una imagen generada por IA.

**¿Qué faltaría para un producto de "producción"?**
* Gestión de usuarios y autenticación.
* Un sistema de créditos o pagos.
* Una base de datos para guardar las generaciones de los usuarios.
* Optimización de la UI y manejo de errores avanzado.

---

### ⚙️ Cómo ejecutar este proyecto localmente

1.  **Clonar el repositorio:**
    ```bash
    git clone [TU_URL_DE_GITHUB_AQUI]
    cd [NOMBRE_DEL_REPOSITORIO]
    ```

2.  **Instalar dependencias (Frontend):**
    ```bash
    # (Ve a la carpeta del frontend si tienes un monorepo)
    npm install
    ```

3.  **Instalar dependencias (Backend):**
    ```bash
    # (Ve a la carpeta 'api' o del backend)
    npm install
    ```

4.  **Variables de Entorno:**
    * Crea un archivo `.env` en la carpeta de tu *backend* (o en la raíz si usas un framework *full-stack*).
    * Añade tu llave de Replicate:
        ```
        REPLICATE_API_TOKEN="tu_KEY_aqui"
        ```

5.  **Ejecutar el proyecto:**
    ```bash
    npm run dev
    ```
