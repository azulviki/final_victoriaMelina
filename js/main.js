  document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("sidebar");

  // Botón hamburguesa
  if (toggle && menu) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("-translate-x-full");
    });
  }

  // Submenús en mobile
  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  submenuToggles.forEach(btn => {
    btn.addEventListener("click", function (e) {
      if (window.innerWidth < 768) {
        const submenu = btn.nextElementSibling;

        if (submenu.classList.contains("hidden")) {
          e.preventDefault();
          submenu.classList.remove("hidden");
        }
        // segundo click navega normalmente
      }
    });
  });

  // Cerrar menú tocando fuera
  document.body.addEventListener("click", (e) => {
    if (window.innerWidth < 768) {
      const insideMenu = menu.contains(e.target);
      const clickedToggle = toggle.contains(e.target);

      if (!insideMenu && !clickedToggle) {
        menu.classList.add("-translate-x-full");
      }
    }
  });
});
