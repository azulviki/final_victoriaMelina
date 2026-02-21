// Inicializar EmailJS
emailjs.init("kgMClobhX34sdZc6l");

const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");

    const errorMsgs = form.querySelectorAll(".error-msg");
    errorMsgs.forEach(msg => msg.classList.add("hidden"));

    let valid = true;

    // Validar nombre
    if (nombre.value.trim() === "") {
        nombre.nextElementSibling.classList.remove("hidden");
        valid = false;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        email.nextElementSibling.classList.remove("hidden");
        valid = false;
    }

    // Validar mensaje
    if (mensaje.value.trim() === "") {
        mensaje.nextElementSibling.classList.remove("hidden");
        valid = false;
    }

    if (!valid) return;

    // Enviar con EmailJS
    emailjs.send("service_voe9b5y", "template_pnx0qpk", {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        mensaje: mensaje.value.trim()
    })
    .then(() => {
        successMsg.classList.remove("hidden");
        errorMsg.classList.add("hidden");
        form.reset();
    })
    .catch(() => {
        errorMsg.classList.remove("hidden");
        successMsg.classList.add("hidden");
    });
});