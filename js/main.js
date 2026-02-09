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
      // Aplicamos la clase de fondo blanco y texto negro
      link.classList.add("bg-white", "text-black");

      // Limpiamos cualquier timeout previo
      if (link.dataset.timeoutId) {
        clearTimeout(link.dataset.timeoutId);
      }

      // Lo removemos después de 1 segundo
      const timeoutId = setTimeout(() => {
        link.classList.remove("bg-white", "text-black");
        delete link.dataset.timeoutId;
      }, 3000);

      link.dataset.timeoutId = timeoutId;
    }
  });
});

});
