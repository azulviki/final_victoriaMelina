  document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("sidebar");

  // --- Toggle del menú hamburguesa ---
  if (toggle && menu) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("-translate-x-full");
    });
  }

  const menuLinks = document.querySelectorAll("#sidebar .nav-key a");

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth < 768) {
        e.preventDefault();

        // Aplicamos efecto flash
        link.classList.add("active");

        // Limpiamos timeouts anteriores
        if (link.dataset.timeoutId) clearTimeout(link.dataset.timeoutId);

        // Esperamos 1 segundo antes de cerrar menú y navegar
        const timeoutId = setTimeout(() => {
          // Removemos la clase de efecto
          link.classList.remove("active");

          // Cerramos el menú con transición
          menu.classList.add("-translate-x-full");

          // Redirigimos al link
          window.location.href = link.href;

          delete link.dataset.timeoutId;
        }, 500);

        link.dataset.timeoutId = timeoutId;
      }
    });
  });

  // --- Cerrar menú si se toca fuera ---
  document.body.addEventListener("click", (e) => {
    if (window.innerWidth < 768) {
      if (!menu.contains(e.target) && !toggle.contains(e.target)) {
        menu.classList.add("-translate-x-full");
      }
    }
  });
});
