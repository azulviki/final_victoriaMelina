const pads = document.querySelectorAll(".pad");
const startBtn = document.getElementById("start");
const levelText = document.getElementById("level");

// audio
const soundFiles = [
  "audio/pad1.mp3",
  "audio/pad2.mp3",
  "audio/pad3.mp3",
  "audio/pad4.mp3",
  "audio/pad5.mp3",
  "audio/pad6.mp3",
  "audio/pad7.mp3",
  "audio/pad8.mp3"
];

const sounds = soundFiles.map(file => {
  const audio = new Audio(file);
  audio.preload = "auto";
  return audio;
});

let sequence = [];
let playerSequence = [];
let level = 1;
let activePads = 4;
let playing = false;

// reproducir sonido
function playSound(id) {
  const audio = sounds[id];
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function flashPad(id) {
  const pad = pads[id];
  if (!pad) return;
  pad.classList.add("active");
  setTimeout(() => pad.classList.remove("active"), 300);
  playSound(id);
}

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

function nextLevel() {
  playerSequence = [];
  level++;
  if (level % 2 === 0 && activePads < sounds.length) activePads++;
  levelText.textContent = "Nivel: " + level;
  const nextPad = Math.floor(Math.random() * activePads);
  sequence.push(nextPad);
  setTimeout(playSequence, 800);
}

// =====================
// iniciar juego
// =====================
startBtn.addEventListener("click", () => {
  sequence = [];
  playerSequence = [];
  level = 1;
  activePads = 4;
  levelText.textContent = "Nivel: 1";
  const firstPad = Math.floor(Math.random() * activePads);
  sequence.push(firstPad);
  playSequence();

  // efecto mobile
  if (window.innerWidth < 768) {
    startBtn.classList.add("bg-purple-600", "text-white");
    setTimeout(() => startBtn.classList.remove("bg-purple-600", "text-white"), 400);
  }
});

// =====================
// input del jugador
// =====================
pads.forEach((pad, index) => {
  pad.addEventListener("click", () => {
    if (playing || index >= activePads) return;
    flashPad(index);
    playerSequence.push(index);

    const currentStep = playerSequence.length - 1;
    if (playerSequence[currentStep] !== sequence[currentStep]) {
      alert("Perdiste. Llegaste al nivel " + level);
      sequence = [];
      playerSequence = [];
      level = 1;
      activePads = 4;
      levelText.textContent = "Nivel: 1";
      return;
    }

    if (playerSequence.length === sequence.length) nextLevel();
  });
});
