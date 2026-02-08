const keys = document.querySelectorAll(".nav-key a");
const soundSrc = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_4d0c9f0b4c.mp3?filename=piano-key-1-17369.mp3";

const audio = new Audio(soundSrc);
audio.volume = 0.4;

function playKeySound() {
    audio.currentTime = 0;
    audio.play().catch(() => {});
}

keys.forEach(key => {
    key.addEventListener("click", playKeySound);
    key.addEventListener("mouseenter", playKeySound);
});

