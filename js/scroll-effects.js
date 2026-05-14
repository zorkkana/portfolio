// 1. Global state to avoid layout thrashing
let currentScroll = window.scrollY;
window.addEventListener(
    'scroll',
    () => {
        currentScroll = window.scrollY;
    },
    { passive: true }
);

const isLowEndDust =
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
    window.innerWidth < 768;
const DUST_PARTICLE_COUNT = isLowEndDust ? 35 : 80;

const canvases = document.querySelectorAll('.dust-canvas');

canvases.forEach((canvas) => {
    const ctx = canvas.getContext('2d', { alpha: true }); // Optimized context
    let particlesArray = [];
    let animationFrameId;
    let isVisible = false;

    // 2. Efficient Resizing
    function resizeCanvas() {
        const parent = canvas.parentElement;
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        init(); // Re-init particles on resize to fit new bounds
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.2;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.speedY = Math.random() * 0.4 - 0.2;
            this.color = `rgba(0, 255, 204, ${Math.random() * 0.6 + 0.1})`;
            this.parallaxSpeed = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0) this.x = canvas.width;
            else if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            else if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = this.color;

            // Use the global currentScroll instead of querying window.scrollY
            let parallaxY = (this.y + currentScroll * this.parallaxSpeed) % canvas.height;
            if (parallaxY < 0) parallaxY += canvas.height;

            ctx.beginPath();
            ctx.arc(this.x, parallaxY, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particlesArray = Array.from({ length: DUST_PARTICLE_COUNT }, () => new Particle());
    }

    function animate() {
        if (!isVisible) return; // STOP animating if not in view

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    // 3. Intersection Observer: Only run JS when canvas is visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    animate();
                } else {
                    cancelAnimationFrame(animationFrameId);
                }
            });
        },
        { threshold: 0.1 }
    );

    observer.observe(canvas);

    // Initial Setup
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
});
