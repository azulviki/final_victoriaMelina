  document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("sidebar");
  
  
  document.querySelectorAll(".submenu").forEach(sub => {
    if (window.innerWidth < 768) {
        sub.style.display = "none";
    }
});

  // Botón hamburguesa
  if (toggle && menu) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("-translate-x-full");
    });
  }

  // Submenús en mobile
  const submenuToggles = document.querySelectorAll(".submenu-toggle");

  submenuToggles.forEach(btn => {btn.addEventListener("click", function (e) 
    {if (window.innerWidth < 768) {
      const submenu = btn.nextElementSibling;
      console.log("submenu encontrado:", submenu); 

      if (submenu.style.display === "block") {
        // ya está abierto, navegar normalmente
      } else {
        // primer click: abrir submenú
        e.preventDefault();
        submenu.style.display = "block";
      }
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
        document.querySelectorAll(".submenu").forEach(sub => sub.style.display = "");
      }
    }
  });
});


//audio en header
const audio = document.getElementById("ambientAudio");
const muteBtn = document.getElementById("muteBtn");
const canvas = document.getElementById("oscilloscope");
const ctx = canvas.getContext("2d");

let audioCtx;
let analyser;
let dataArray;

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);

    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    dataArray = new Uint8Array(analyser.fftSize);

    draw();
}

function draw() {
    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "rgba(140,160,255,0)");
    gradient.addColorStop(0.5, "rgba(140,160,255,0.7)");
    gradient.addColorStop(1, "rgba(140,160,255,0)");



ctx.strokeStyle = gradient;
    ctx.beginPath();

    const sliceWidth = canvas.width / dataArray.length;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
        let v = dataArray[i] / 128.0;
        let y = (v * canvas.height) / 2;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }

        x += sliceWidth;
    }

    ctx.stroke();
}

// Activación con primer click
window.addEventListener("click", () => {
    if (!audioCtx) {
        initAudio();
        audio.play();
    }
}, { once: true });

// Botón mute
muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "🔇" : "🔊";
    canvas.classList.toggle("hidden", audio.muted);
});

