const images = document.querySelectorAll(".intro-img");
const text = document.getElementById("intro-text");
const hearBtn = document.getElementById("hear-btn");
const canvas = document.getElementById("synth-wave");
const ctx = canvas.getContext("2d");

const tracks = [
  "audio/track1.mp3",
  "audio/track2.mp3",
  "audio/track3.mp3"
];

let index = 0;
let imageTimer;

let audioContext;
let analyser;
let dataArray;
let source;
let audioEl;

// =======================
// Loop de imágenes
// =======================
function resetImages() {
  images.forEach(img => img.classList.remove("active"));
  index = 0;
}

function showNextImage() {
  images.forEach((img, i) => img.classList.remove("active"));
  images[index].classList.add("active");
  index = (index + 1) % images.length;
  imageTimer = setTimeout(showNextImage, 1200);
}

function startImageSequence() {
  resetImages();
  showNextImage();
}

// =======================
// Osciloscopio
// =======================
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawWave() {
  requestAnimationFrame(drawWave);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!analyser || !dataArray) return;

  analyser.getByteTimeDomainData(dataArray);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#00ffff";
  ctx.beginPath();

  const sliceWidth = canvas.width / dataArray.length;
  let x = 0;

  for (let i = 0; i < dataArray.length; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * canvas.height) / 2;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);

    x += sliceWidth;
  }

  ctx.stroke();
}
drawWave();

// =======================
// Mostrar fotos y texto al cargar
// =======================
window.addEventListener("load", () => {
  startImageSequence();
  setTimeout(() => {
    text.style.opacity = "1";
  }, 2000);
});

// =======================
// Botón OÍR
// =======================
hearBtn.addEventListener("click", async () => {
  // Reiniciar fotos
  clearTimeout(imageTimer);
  startImageSequence();

  // Elegir track aleatoria
  const track = tracks[Math.floor(Math.random() * tracks.length)];

  // Crear AudioContext y audio solo dentro del click
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    audioEl = new Audio(track);
    audioEl.loop = true;
    audioEl.volume = 0.6;

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    source = audioContext.createMediaElementSource(audioEl);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audioEl.play().catch(err => console.log(err));
  } else {
    // Cambiar canción de manera segura
    audioEl.pause();
    audioEl.src = track;
    audioEl.load();
    audioEl.play().catch(err => console.log(err));
  }

  hearBtn.textContent = "SONANDO...";
});


