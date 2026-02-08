const title = document.getElementById("intro-title");
const subtitle = document.getElementById("intro-subtitle");
const button = document.getElementById("enter-btn");
const intro = document.getElementById("intro");

function fadeIn(element, delay) {
    setTimeout(() => {
        element.style.transition = "opacity 1s ease";
        element.style.opacity = 1;
    }, delay);
}

// Animaciones en secuencia
window.addEventListener("load", () => {
    fadeIn(title, 300);
    fadeIn(subtitle, 1200);
    fadeIn(button, 2000);
});

// Click en entrar
button.addEventListener("click", () => {
    intro.style.transition = "opacity 0.8s ease";
    intro.style.opacity = 0;

    setTimeout(() => {
        window.location.href = "index.html";
    }, 800);
});
