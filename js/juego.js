// =======================
// ELEMENTOS DEL DOM
// =======================
const pads = document.querySelectorAll(".pad");
const startBtn = document.getElementById("start");
const levelText = document.getElementById("level");

// =======================
// SONIDOS
// =======================
const soundFiles = [
  "audio/pad1.wav",
  "audio/pad2.wav",
  "audio/pad3.wav",
  "audio/pad4.wav",
  "audio/pad5.wav",
  "audio/pad6.wav",
  "audio/pad7.wav",
  "audio/pad8.wav"
];

// precargar audios
const audioObjects = soundFiles.map(src => {
  const a = new Audio(src);
  a.volume = 0.6;
  return a;
});

// reproducir sonido de pad
function playSound(id) {
  const audio = audioObjects[id];
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// =======================
// VARIABLES DEL JUEGO
// =======================
let sequence = [];
let playerSequence = [];
let level = 1;
let activePads = 4; // cantidad de pads activos inicial
let playing = false;

// =======================
// FUNCIONES DEL JUEGO
// =======================

// iluminar pad
function flashPad(id) {
  const pad = pads[id];
  if (!pad) return;
  pad.classList.add("active");
  playSound(id);
  setTimeout(() => pad.classList.remove("active"), 300);
}

// mostrar secuencia
function playSequence() {
  let i = 0;
  playing = true;

  const interval = setInterval(() => {
    flashPad(sequence[i]);
    i++;

    if (i >= sequence.length) {
      clearInterval(interval);
      playing = false;
    }
  }, 600);
}

// siguiente nivel
function nextLevel() {
  playerSequence = [];
  level++;

  // cada 2 niveles agrega un pad
  if (level % 2 === 0 && activePads < pads.length) {
    activePads++;
  }

  levelText.textContent = "Nivel: " + level;

  const nextPad = Math.floor(Math.random() * activePads);
  sequence.push(nextPad);

  setTimeout(playSequence, 800);
}

// iniciar juego
function startGame() {
  sequence = [];
  playerSequence = [];
  level = 1;
  activePads = 4;
  levelText.textContent = "Nivel: 1";

  // desbloquear audios (Chrome)
  audioObjects.forEach(a => {
    a.play().then(() => a.pause()).catch(() => {});
  });

  const firstPad = Math.floor(Math.random() * activePads);
  sequence.push(firstPad);

  playSequence();
}

// =======================
// EVENTOS
// =======================

// hover / efecto mobile
startBtn.addEventListener("click", (e) => {
  // efecto solo en mobile
  if (window.innerWidth < 768) {
    startBtn.classList.add("bg-purple-600", "text-white");
    setTimeout(() => {
      startBtn.classList.remove("bg-purple-600", "text-white");
    }, 400);
  }

  startGame();
});

// input del jugador
pads.forEach((pad, index) => {
  pad.addEventListener("click", () => {
    if (playing || index >= activePads) return;

    flashPad(index);
    playerSequence.push(index);

    const currentStep = playerSequence.length - 1;

    if (playerSequence[currentStep] !== sequence[currentStep]) {
      alert("Perdiste. Llegaste al nivel " + level);
      startGame(); // reinicia juego automáticamente
      return;
    }

    if (playerSequence.length === sequence.length) {
      nextLevel();
    }
  });
});

// =======================
// HOVER DESKTOP
// =======================
startBtn.addEventListener("mouseenter", () => {
  if (window.innerWidth >= 768) {
    startBtn.classList.add("bg-purple-600", "text-white");
  }
});

startBtn.addEventListener("mouseleave", () => {
  if (window.innerWidth >= 768) {
    startBtn.classList.remove("bg-purple-600", "text-white");
  }
});
