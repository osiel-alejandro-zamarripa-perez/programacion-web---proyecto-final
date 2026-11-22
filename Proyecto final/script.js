document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. alternador de tema (dark / light mode)
    // ==========================================
    const btnTema = document.getElementById('btn-tema');
    const cuerpo = document.body;

    const temaGuardado = localStorage.getItem('tema-portafolio');
    if (temaGuardado === 'oscuro') {
        cuerpo.classList.add('dark-mode');
        btnTema.textContent = 'Modo Claro';
    }

    btnTema.addEventListener('click', () => {
        cuerpo.classList.toggle('dark-mode');
        if (cuerpo.classList.contains('dark-mode')) {
            btnTema.textContent = 'Modo Claro';
            localStorage.setItem('tema-portafolio', 'oscuro');
        } else {
            btnTema.textContent = 'Modo Oscuro';
            localStorage.setItem('tema-portafolio', 'claro');
        }
    });

    // ==========================================
    // 2. menu hamburguesa para version movil
    // ==========================================
    const btnMenu = document.getElementById('btn-menu');
    const navPrincipal = document.getElementById('nav-principal');
    const enlacesNav = navPrincipal.querySelectorAll('a');

    btnMenu.addEventListener('click', () => {
        const estaAbierto = navPrincipal.classList.toggle('nav-abierto');
        btnMenu.setAttribute('aria-expanded', estaAbierto);
        btnMenu.textContent = estaAbierto ? '✕' : '☰';
    });

    enlacesNav.forEach((enlace) => {
        enlace.addEventListener('click', () => {
            navPrincipal.classList.remove('nav-abierto');
            btnMenu.setAttribute('aria-expanded', 'false');
            btnMenu.textContent = '☰';
        });
    });

    // ==========================================
    // 3. cargar proyectos dinamicamente desde api
    // ==========================================
    const contenedorProyectos = document.getElementById('lista-proyectos');

    async function cargarProyectos() {
        try {
            const respuesta = await fetch('/api/proyectos');
            const proyectos = await respuesta.json();

            contenedorProyectos.innerHTML = '';

            proyectos.forEach((proj) => {
                const tagsHtml = proj.tecnologias
                    .map(tech => `<li>${tech}</li>`)
                    .join('');

                const tarjeta = document.createElement('article');
                tarjeta.className = 'tarjeta-proyecto';
                tarjeta.innerHTML = `
                    <img src="${proj.imagen_url}" alt="Vista previa de ${proj.titulo}" class="proyecto-imagen">
                    <div class="proyecto-cuerpo">
                        <h3>${proj.titulo}</h3>
                        <span class="proyecto-categoria">${proj.categoria}</span>
                        <p>${proj.descripcion}</p>
                    </div>
                    <ul class="proyecto-tags">
                        ${tagsHtml}
                    </ul>
                `;
                contenedorProyectos.appendChild(tarjeta);
            });
        } catch (error) {
            console.error('Error al cargar proyectos:', error);
            contenedorProyectos.innerHTML = '<p>No se pudieron cargar los proyectos en este momento.</p>';
        }
    }

    // ==========================================
    // 4. validacion y envio del formulario al servidor
    // ==========================================
    const formulario = document.getElementById('form-contacto');
    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const inputAsunto = document.getElementById('asunto');
    const inputMensaje = document.getElementById('mensaje');
    const cajaAlerta = document.getElementById('mensaje-formulario');
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function mostrarMensaje(texto, tipo) {
        cajaAlerta.textContent = texto;
        cajaAlerta.className = `alerta-formulario ${tipo}`;
    }

    formulario.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const nombre = inputNombre.value.trim();
        const correo = inputCorreo.value.trim();
        const asunto = inputAsunto.value.trim();
        const mensaje = inputMensaje.value.trim();

        if (nombre === '' || correo === '' || asunto === '' || mensaje === '') {
            mostrarMensaje('Por favor, completa todos los campos antes de enviar.', 'error');
            return;
        }

        if (!regexCorreo.test(correo)) {
            mostrarMensaje('Por favor, ingresa un correo electrónico válido (ejemplo@dominio.com).', 'error');
            inputCorreo.focus();
            return;
        }

        try {
            const respuesta = await fetch('/api/contacto', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, correo, asunto, mensaje })
            });

            if (respuesta.ok) {
                mostrarMensaje(`¡Gracias, ${nombre}! Tu mensaje fue recibido correctamente por el servidor.`, 'exito');
                formulario.reset();
            } else {
                mostrarMensaje('Hubo un problema al enviar tu mensaje al servidor.', 'error');
            }
        } catch (error) {
            console.error('Error de red:', error);
            mostrarMensaje('No se pudo conectar con el servidor.', 'error');
        }
    });

    // ejecutar carga inicial de proyectos
    cargarProyectos();
});