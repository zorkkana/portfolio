const music = document.getElementById('bg-music');
const wave = document.getElementById('wave-container');
const statusText = document.getElementById('audio-status');
let statusTimeout;
let fadeInterval;

music.volume = 0;

function toggleMusic() {
    const fadeDuration = 1000;
    const targetMaxVolume = 0.05;
    const step = 0.01;
    const intervalTime = fadeDuration / (targetMaxVolume / step);

    clearInterval(fadeInterval);

    if (music.paused) {
        // --- FADE IN ---
        music.play();
        wave.classList.add('playing');
        statusText.innerText = 'SOUND: ON';

        fadeInterval = setInterval(() => {
            if (music.volume < targetMaxVolume) {
                music.volume = Math.min(targetMaxVolume, music.volume + step);

                // NEW: Smoothly increase wave bounce as volume goes up
                let progress = music.volume / targetMaxVolume;
                wave.style.setProperty('--wave-scale', 0.33 + progress * 0.67);
            } else {
                clearInterval(fadeInterval);
            }
        }, intervalTime);
    } else {
        // --- FADE OUT ---
        statusText.innerText = 'SOUND: OFF';

        fadeInterval = setInterval(() => {
            if (music.volume > 0.01) {
                music.volume = Math.max(0, music.volume - step);

                // NEW: Smoothly decrease wave bounce as volume goes down
                let progress = music.volume / targetMaxVolume;
                wave.style.setProperty('--wave-scale', 0.33 + progress * 0.67);
            } else {
                music.pause();
                wave.classList.remove('playing');
                wave.style.setProperty('--wave-scale', 1); // Reset for the next play
                clearInterval(fadeInterval);
            }
        }, intervalTime);
    }

    // --- Mobile Visibility Logic ---
    if (window.innerWidth <= 768) {
        clearTimeout(statusTimeout);
        statusText.classList.add('mobile-visible');
        statusTimeout = setTimeout(() => {
            statusText.classList.remove('mobile-visible');
        }, 3000);
    }
}

// --- SFX DEFINITIONS ---
const sfxHover = new Audio('/sounds/255764__andreasmustola__mouse-hover.mp3');
const sfxClick = new Audio('/sounds/702168__foxfire__click-tick-menu-navigation.wav');

// Set volumes extremely low (subtlety is key!)
sfxHover.volume = 1;
sfxClick.volume = 1;

// Helper to play sound ONLY if master audio is ON
function playSFX(audio) {
    if (!music.paused) {
        audio.currentTime = 0; // Reset to start for rapid clicks
        audio.play().catch(() => {}); // Catch errors if browser blocks audio
    }
}
// --- GLOBAL SFX LISTENER ---
window.addEventListener('mouseover', (e) => {
    // 1. Find the target element with the class
    const target = e.target.closest('.sfx-hover');

    // 2. Find where the mouse just came from
    const from = e.relatedTarget ? e.relatedTarget.closest('.sfx-hover') : null;

    // 3. ONLY play if we are entering a NEW .sfx-hover element
    // This prevents the sound from restarting when moving over text inside a button
    if (target && target !== from) {
        playSFX(sfxHover);
    }
});

window.addEventListener('click', (e) => {
    if (e.target.closest('.sfx-click')) {
        playSFX(sfxClick);
    }
});
