async function initParticles() {
    try {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'libs/particles.min.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });

        const isMobile = window.innerWidth < 768;
        const isLowEnd =
            (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
            (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
        const modal2 = document.getElementById('whatareudoung');
        const particlesContainer = document.getElementById('particles-js');
        let isVisible = false; // Track visibility
        let clickCount = 0;

        const particleCount = isMobile ? (isLowEnd ? 18 : 30) : (isLowEnd ? 45 : 80);

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: particleCount, // Scaled by device capability
                    density: { enable: true, value_area: 800 },
                },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true }, // Smaller particles = less paint work
                line_linked: {
                    enable: true,
                    distance: 130,
                    color: '#00ffcc',
                    opacity: 0.3,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: isMobile ? 0.8 : 1.5, // Slower is easier on the CPU
                    direction: 'none',
                    out_mode: 'out',
                },
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onclick: { enable: true, mode: 'push' },
                    resize: true,
                },
                modes: { push: { particles_nb: 3 } },
            },
            retina_detect: false, // Keep false for performance
        });

        if (!isMobile && !isLowEnd) {
            const mouse = { x: null, y: null };
            // Passive listener for better scroll performance
            particlesContainer.addEventListener(
                'mousemove',
                (e) => {
                    const rect = particlesContainer.getBoundingClientRect();
                    mouse.x = e.clientX - rect.left;
                    mouse.y = e.clientY - rect.top;
                },
                { passive: true }
            );

            particlesContainer.addEventListener(
                'mouseleave',
                () => {
                    mouse.x = null;
                    mouse.y = null;
                },
                { passive: true }
            );

            const RADIUS_SQ = 140 * 140; // Use squared radius to avoid Math.sqrt
            const STRENGTH = 1.4;
            const MAX_SPD = 12;

            function trampolineLoop() {
                if (!isVisible) {
                    requestAnimationFrame(trampolineLoop);
                    return;
                }

                const pjs = window.pJSDom?.[0]?.pJS;
                if (!pjs) {
                    requestAnimationFrame(trampolineLoop);
                    return;
                }

                const particles = pjs.particles.array;

                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];

                    if (p._baseVx === undefined) {
                        p._baseVx = p.vx;
                        p._baseVy = p.vy;
                    }

                    if (mouse.x !== null) {
                        const dx = p.x - mouse.x;
                        const dy = p.y - mouse.y;
                        const distSq = dx * dx + dy * dy; // Avoid SQRT here

                        if (distSq < RADIUS_SQ && distSq > 0.25) {
                            const dist = Math.sqrt(distSq); // Only SQRT if absolutely necessary
                            const t = 1 - dist / 140;
                            const force = STRENGTH * t * t * (3 - 2 * t);
                            p.vx += (dx / dist) * force;
                            p.vy += (dy / dist) * force;
                            p._kicked = true;
                        }
                    }

                    // Optimized velocity capping
                    const spdSq = p.vx * p.vx + p.vy * p.vy;
                    if (spdSq > 144) {
                        // 12^2
                        const spd = Math.sqrt(spdSq);
                        p.vx = (p.vx / spd) * MAX_SPD;
                        p.vy = (p.vy / spd) * MAX_SPD;
                    }

                    if (p._kicked) {
                        p.vx = p.vx * 0.94 + p._baseVx * 0.06;
                        p.vy = p.vy * 0.94 + p._baseVy * 0.06;
                        if (Math.abs(p.vx - p._baseVx) < 0.1 && Math.abs(p.vy - p._baseVy) < 0.1)
                            p._kicked = false;
                    }
                }
                requestAnimationFrame(trampolineLoop);
            }
            requestAnimationFrame(trampolineLoop);
        }

        // Easter egg click
        particlesContainer.addEventListener('click', () => {
            if (++clickCount === 10) {
                modal2.classList.add('active');
                clickCount = 0;
            }
        });

        // ── IMPORTANT: Toggle isVisible ──
        const pObserver = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                const canvas = particlesContainer.querySelector('canvas');
                if (canvas) canvas.style.visibility = isVisible ? 'visible' : 'hidden';
            },
            { threshold: 0.1 }
        );

        pObserver.observe(particlesContainer);
    } catch (err) {
        console.error('Particles failed:', err);
    }
}

// Kickoff
if (document.readyState === 'complete') initParticles();
else window.addEventListener('load', initParticles);
