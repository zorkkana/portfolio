const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

// Bail on touch / coarse-pointer devices — cursor is hidden via CSS there,
// so running rAF + global mousemove just wastes battery on phones/tablets.
const supportsFineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (!supportsFineHover || !dot || !outline) {
    // No-op stubs so the rest of this file does nothing
} else {

let mouseX = 0,
    mouseY = 0; // Real mouse position
let outlineX = 0,
    outlineY = 0; // "Smooth" ring position

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // The dot stays locked to the mouse (Instant feedback)
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
}, { passive: true });

function animateCursor() {
    // LERP logic: CurrentPos + (TargetPos - CurrentPos) * Smoothness
    // 0.1 is very smooth/slow, 0.2 is snappier
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    outline.style.left = `${outlineX}px`;
    outline.style.top = `${outlineY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor(); // Start the loop

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    outline.style.opacity = '1';
});

// --- THE GLOBAL HOVER DETECTOR ---
// One delegated listener instead of binding to every interactive element
window.addEventListener('mouseover', (e) => {
    const isInteractive = e.target.closest('a, button, .magnetic, input, textarea, .lang-item, .social-mini-link');
    document.body.classList.toggle('cursor-active', !!isInteractive);
});

// Handle Click Scaling
window.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    outline.style.transform = 'translate(-50%, -50%) scale(0.8)';
    outline.style.borderColor = '#fd7a33';
});

window.addEventListener('mouseup', () => {
    dot.style.transform = '';
    outline.style.transform = '';
    outline.style.borderColor = 'rgba(0, 255, 204, 0.5)';
});

} // end supportsFineHover guard
