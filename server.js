const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// lista de proyectos servida dinamicamente desde el backend
const proyectos = [
    {
        id: 1,
        titulo: 'ASIC de Control VGA y Motores (Tiny Tapeout)',
        categoria: 'Diseño Digital y VLSI',
        descripcion: 'Diseño RTL en Verilog que integra generación de sincronización VGA y control de dirección para motores, verificado mediante pruebas automatizadas en Cocotb y análisis de ondas en Surfer.',
        imagen_url: 'imagenes/proyecto-vga.webp',
        tecnologias: ['Verilog', 'Cocotb', 'Tiny Tapeout']
    },
    {
        id: 2,
        titulo: 'Mejora de Imágenes mediante Redes Neuronales Convolucionales (CNN)',
        categoria: 'Machine Learning',
        descripcion: 'Entrenamiento y evaluación de un modelo de aprendizaje profundo en TensorFlow/Keras para restauración de imágenes, optimizando métricas PSNR y SSIM.',
        imagen_url: 'imagenes/proyecto-cnn.webp',
        tecnologias: ['Python', 'TensorFlow', 'Keras']
    },
    {
        id: 3,
        titulo: 'Sistema de Instrumentación y Calibración de Temperatura',
        categoria: 'Instrumentación Electrónica',
        descripcion: 'Acondicionamiento de señal mediante puente de Wheatstone y amplificador de instrumentación para sensor RTD TD5A, con interfaz de lectura en LabVIEW.',
        imagen_url: 'imagenes/proyecto-rtd.webp',
        tecnologias: ['LabVIEW', 'Arduino', 'Sensores RTD']
    }
];

// arreglo donde se almacenan los mensajes del formulario
const mensajesRecibidos = [];

// middlewares para parsear json y servir la carpeta "Proyecto final"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Proyecto final')));

// ==========================================
// rutas api rest
// ==========================================

// obtener todos los proyectos
app.get('/api/proyectos', (req, res) => {
    res.json(proyectos);
});

// recibir mensaje del formulario de contacto
app.post('/api/contacto', (req, res) => {
    const { nombre, correo, asunto, mensaje } = req.body;

    if (!nombre || !correo || !asunto || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoMensaje = {
        id: mensajesRecibidos.length + 1,
        nombre,
        correo,
        asunto,
        mensaje,
        fecha: new Date().toISOString()
    };

    mensajesRecibidos.push(nuevoMensaje);
    console.log('Nuevo mensaje recibido:', nuevoMensaje);

    res.status(201).json({
        exito: true,
        mensaje: 'Mensaje recibido correctamente en el servidor',
        id: nuevoMensaje.id
    });
});

// consultar mensajes recibidos (opcional para verificar en navegador)
app.get('/api/mensajes', (req, res) => {
    res.json(mensajesRecibidos);
});

// iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});