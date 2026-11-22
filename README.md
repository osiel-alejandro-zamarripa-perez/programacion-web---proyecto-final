# Portafolio Profesional y Currículum Digital

Aplicación web Full-Stack desarrollada como proyecto final de Programación Web. Integra un frontend responsivo y accesible con un servidor backend en **Node.js** y **Express** para la carga dinámica de proyectos y el procesamiento del formulario de contacto mediante una API REST.

## Link de render
* **Demo desplegada en Render:** `https://programacion-web-proyecto-final.onrender.com`

## Tecnologías Utilizadas
* **Frontend:** HTML5 semántico, CSS3 (Grid, Flexbox, Variables CSS y Modo Oscuro persistente con `localStorage`), JavaScript Vanilla (`Fetch API` y validación de formularios).
* **Backend:** Node.js, Express (`express.static` y endpoints REST).

## Estructura del Proyecto
```text
├── Proyecto final/          # Archivos estáticos del cliente (Frontend)
│   ├── imagenes/            # Recursos gráficos optimizados (.webp)
│   ├── index.html           # Estructura semántica principal
│   ├── styles.css           # Estilos responsivos y tema claro/oscuro
│   └── script.js            # Consumo de API, menú móvil y validación
├── server.js                # Servidor Express y rutas de la API REST
├── package.json             # Metadatos y dependencias del proyecto
├── package-lock.json        # Versiones exactas de las dependencias
└── .gitignore               # Exclusión de node_modules/ y archivos locales
