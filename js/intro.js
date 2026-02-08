const images = document.querySelectorAll(".intro-img");
const text = document.getElementById("intro-text");
const hearBtn = document.getElementById("hear-btn");
const canvas = document.getElementById("synth-wave");
const ctx = canvas.getContext("2d");
const audioEl = document.getElementById("intro-audio");

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
  imageTimer = setTimeout(showNextImage, 3000);
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
  ctx.strokeStyle = "#8B5CF6";
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
    text.classList.remove("opacity-0");
    text.classList.add("opacity-100");
  }, 1000);
});

// =======================
// Botón OÍR
// =======================
hearBtn.addEventListener("click", async () => {
  const track = tracks[Math.floor(Math.random() * tracks.length)];
  // efecto visual seguro
  hearBtn.classList.add("activo");

setTimeout(() => {
  hearBtn.classList.remove("activo");
}, 400);


    // Detener audio anterior si existe
  if (!audioEl.paused) {
    audioEl.pause();
  }

  // Asignar nueva pista y cargar
  audioEl.src = track;
  audioEl.loop = true;
  audioEl.volume = 0.6;
  audioEl.load();

  // Esperar que el audio pueda reproducirse
  try {
    await audioEl.play(); // Este play desbloquea el audio en Chrome
  } catch (err) {
    console.log("Error al reproducir:", err);
    return;
  }

  // Crear AudioContext y conectar al osciloscopio solo la primera vez
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") await audioContext.resume();

    source = audioContext.createMediaElementSource(audioEl);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    source.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  hearBtn.textContent = "OÍR";
});


// =======================
// Botón entrar en silencio
// =======================
const silentBtn = document.querySelector("#intro-text a");
silentBtn.addEventListener("click", () => {
  if (!audioEl.paused) audioEl.pause();
});
