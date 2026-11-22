// esperar a que todo el dom este cargado antes de ejecutar el codigo
document.addEventListener('DOMContentLoaded', () => {
    
    
    // 1. alternador de tema 
    
    const btnTema = document.getElementById('btn-tema');
    const cuerpo = document.body;

    // revisar si el usuario ya tenia guardado un tema en localstorage
    const temaGuardado = localStorage.getItem('tema-portafolio');
    if (temaGuardado === 'oscuro') {
        cuerpo.classList.add('dark-mode');
        btnTema.textContent = 'Modo Claro';
    }

    // cambiar tema al hacer clic y guardar preferencia
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

    // abrir o cerrar el menu al presionar el boton
    btnMenu.addEventListener('click', () => {
        const estaAbierto = navPrincipal.classList.toggle('nav-abierto');
        btnMenu.setAttribute('aria-expanded', estaAbierto);
        btnMenu.textContent = estaAbierto ? '✕' : '☰';
    });

    // cerrar el menu automaticamente al hacer clic en un enlace (en movil)
    enlacesNav.forEach((enlace) => {
        enlace.addEventListener('click', () => {
            navPrincipal.classList.remove('nav-abierto');
            btnMenu.setAttribute('aria-expanded', 'false');
            btnMenu.textContent = '☰';
        });
    });

    // ==========================================
    // 3. validacion del formulario de contacto
    // ==========================================
    const formulario = document.getElementById('form-contacto');
    const inputNombre = document.getElementById('nombre');
    const inputCorreo = document.getElementById('correo');
    const inputAsunto = document.getElementById('asunto');
    const inputMensaje = document.getElementById('mensaje');
    const cajaAlerta = document.getElementById('mensaje-formulario');

    // expresion regular para comprobar formato valido de correo electronico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // funcion auxiliar para mostrar alertas en el dom
    function mostrarMensaje(texto, tipo) {
        cajaAlerta.textContent = texto;
        cajaAlerta.className = `alerta-formulario ${tipo}`;
    }

    formulario.addEventListener('submit', (evento) => {
        // evitar que la pagina se recargue al enviar
        evento.preventDefault();

        const nombre = inputNombre.value.trim();
        const correo = inputCorreo.value.trim();
        const asunto = inputAsunto.value.trim();
        const mensaje = inputMensaje.value.trim();

        // validar que ningun campo este vacio
        if (nombre === '' || correo === '' || asunto === '' || mensaje === '') {
            mostrarMensaje('Por favor, completa todos los campos antes de enviar.', 'error');
            return;
        }

        // validar formato de correo electronico
        if (!regexCorreo.test(correo)) {
            mostrarMensaje('Por favor, ingresa un correo electrónico válido (ejemplo@dominio.com).', 'error');
            inputCorreo.focus();
            return;
        }

        // si todo es correcto, mostrar confirmacion y limpiar campos
        mostrarMensaje(`¡Gracias, ${nombre}! Tu mensaje ha sido validado correctamente.`, 'exito');
        formulario.reset();
    });
});