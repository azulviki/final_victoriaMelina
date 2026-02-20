const items = document.querySelectorAll(".gallery-item");
let currentHowl = null;
let currentItem = null;
let animationId = null;

items.forEach(item => {
    const indicator = item.querySelector(".gallery-overlay span");
    const progressBar = item.closest(".gallery-wrapper").querySelector(".progress-bar");
    const container = item.closest(".gallery-wrapper").querySelector(".progress-bar-container");

    // Click en la barra de progreso
    container.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentItem === item && currentHowl) {
            const rect = container.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            currentHowl.seek(ratio * currentHowl.duration());
        }
    });

    // Click en la foto
    item.addEventListener("click", (e) => {
        e.stopPropagation();
        const src = item.dataset.audio;

        
        // Detener el anterior
if (currentHowl && currentItem !== item) {
    currentHowl.stop();
    currentItem.querySelector(".gallery-overlay span").textContent = "🎵";
    currentItem.closest(".gallery-wrapper").querySelector(".progress-bar").style.width = "0%";
    cancelAnimationFrame(animationId);
}

        // Pausar si ya está sonando
        if (currentHowl && currentItem === item && currentHowl.playing()) {
            currentHowl.pause();
            indicator.textContent = "🎵";
            cancelAnimationFrame(animationId);
            return;
        }

        // Reproducir nuevo
        if (currentItem !== item || !currentHowl) {
            currentHowl = new Howl({
                src: [src],
                html5: true,
                onend: () => {
                    indicator.textContent = "🎵";
                    progressBar.style.width = "0%";
                }
            });
        }

        currentHowl.play();
        currentItem = item;
        indicator.textContent = "⏸";

        // Animación de progreso
        function updateProgress() {
            if (currentHowl && currentHowl.playing()) {
                const ratio = currentHowl.seek() / currentHowl.duration();
                progressBar.style.width = (ratio * 100) + "%";
                animationId = requestAnimationFrame(updateProgress);
            }
        }
        updateProgress();
    });
});