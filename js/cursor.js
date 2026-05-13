const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

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
});

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

// Handle Hover States
const interactiveElements = document.querySelectorAll('a, button, .lang-item, .social-mini-link');

interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-active');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-active');
    });
});

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    outline.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    outline.style.opacity = '1';
});
// NEW: Handle Click Scaling
window.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    outline.style.transform = 'translate(-50%, -50%) scale(0.8)';
    outline.style.borderColor = '#fd7a33'; // Changes to your ISS orange on click
});

window.addEventListener('mouseup', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
    outline.style.transform = 'translate(-50%, -50%) scale(1)';
    outline.style.borderColor = 'rgba(0, 255, 204, 0.5)'; // Back to Cyan
});

// --- THE GLOBAL HOVER DETECTOR ---
// Instead of a loop, we listen to the whole window.
window.addEventListener('mouseover', (e) => {
    // Check if the element being hovered (or its parent) is a link, button, or magnetic element
    const isInteractive = e.target.closest('a, button, .magnetic, input, textarea');

    if (isInteractive) {
        document.body.classList.add('cursor-active');
    } else {
        document.body.classList.remove('cursor-active');
    }
});

// NEW: Handle Click Scaling (Refined)
// We use 'active' class to prevent transform conflicts with the hover scale
window.addEventListener('mousedown', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    outline.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

window.addEventListener('mouseup', () => {
    // We clear the manual transform so the CSS classes can take over again
    dot.style.transform = '';
    outline.style.transform = '';
});
