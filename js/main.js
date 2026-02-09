document.addEventListener("DOMContentLoaded", function () {
  // --- Toggle del menú hamburguesa ---
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("sidebar");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("-translate-x-full");
    });
  }

  // --- Efecto de selección para links en mobile ---
  const menuLinks = document.querySelectorAll("#sidebar .nav-key a");

  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        // Quitamos primero cualquier clase residual
        link.classList.remove("bg-white", "text-black");

        // Forzamos reflujo para reiniciar la transición
        void link.offsetWidth;

        // Aplicamos las clases de efecto
        link.classList.add("bg-white", "text-black", "transition-colors", "duration-500", "ease-in-out");

        // Removemos las clases después de 1 segundo
        setTimeout(() => {
          link.classList.remove("bg-white", "text-black");
        }, 1000);
      }
    });
  });
});
