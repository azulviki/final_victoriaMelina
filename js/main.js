document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("sidebar");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      menu.classList.toggle("-translate-x-full");
    });
  }
});
