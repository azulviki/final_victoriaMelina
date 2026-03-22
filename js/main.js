  document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("sidebar");

  if (toggle && menu) {
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("-translate-x-full");
      toggle.classList.toggle("hidden");
    });
  }

  document.body.addEventListener("click", (e) => {
    if (window.innerWidth < 768) {
      const insideMenu = menu.contains(e.target);
      const clickedToggle = toggle.contains(e.target);

      if (!insideMenu && !clickedToggle) {
        menu.classList.add("-translate-x-full");
        toggle.classList.remove("hidden");
        document.querySelectorAll(".submenu").forEach(sub => sub.style.display = "");
      }
    }
  });
});


// Audio en header
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("ambientAudio");
  const muteBtn = document.getElementById("muteBtn");
  const canvas = document.getElementById("oscilloscope");
  const pulseRing = document.getElementById("pulse-ring");
const pulseDot = document.getElementById("pulse-dot");

  if (!audio || document.body.hasAttribute("data-no-audio")) return;

  const ctx = canvas ? canvas.getContext("2d") : null;

  let audioCtx;
  let analyser;
  let dataArray;
  let audioInitialized = false; // ← estaba faltando esto

  if (canvas) {
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
  }

  function initAudio() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(audio);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    dataArray = new Uint8Array(analyser.fftSize);
    audioInitialized = true;
    if (canvas) draw();
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
      if (i === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
      x += sliceWidth;
    }
    ctx.stroke();
  } // ← draw() cierra acá

  // Botón de audio — único lugar donde se controla
 if (muteBtn) {
  muteBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!audioInitialized) {
      initAudio();
    }

    if (audio.paused) {
      audio.play();
      muteBtn.classList.remove("muted");
      if (canvas) canvas.classList.remove("hidden");
    } else {
      audio.pause();
      muteBtn.classList.add("muted");
      if (canvas) canvas.classList.add("hidden");
    }
  });
}

}); //cierre del documentLoader