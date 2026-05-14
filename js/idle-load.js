window.addEventListener('load', () => {
    const runner = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));

    runner(() => {
        const isLowEnd =
            (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
            (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
        const TILE_SIZE = 60;
        // Fewer animated tiles on weak devices — grid lines stay identical
        const TILE_PROB = isLowEnd ? 0.15 : 0.3;

        function initGrid(bg) {
            const canvas = document.createElement('canvas');
            canvas.className = 'tiles-canvas';

            // background without pushing any sibling content around.
            canvas.style.cssText = `
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            `;

            // the canvas's absolute coords are relative to it.
            if (getComputedStyle(bg).position === 'static') {
                bg.style.position = 'relative';
            }

            bg.appendChild(canvas);
            const ctx = canvas.getContext('2d', { alpha: true });

            let tiles = [];
            let animationFrame;
            let isVisible = false;

            bg.style.backgroundImage = `
                linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `;
            bg.style.backgroundSize = `${TILE_SIZE}px ${TILE_SIZE}px`;

            function rebuild() {
                const W = bg.offsetWidth;
                const H = bg.offsetHeight;
                if (!W || !H) return;

                const dpr = window.devicePixelRatio || 1;
                canvas.width = W * dpr;
                canvas.height = H * dpr;
                ctx.scale(dpr, dpr);

                const cols = Math.ceil(W / TILE_SIZE);
                const rows = Math.ceil(H / TILE_SIZE);

                tiles = [];
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        if (Math.random() <= TILE_PROB) {
                            tiles.push({
                                x: c * TILE_SIZE,
                                y: r * TILE_SIZE,
                                offset: Math.random() * Math.PI * 2,
                            });
                        }
                    }
                }
            }

            function animate(time) {
                if (!isVisible) return;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'rgba(0, 255, 204, 0.1)';

                for (let i = 0; i < tiles.length; i++) {
                    const t = tiles[i];
                    const opacity = (Math.sin(time / 1000 + t.offset) + 1) / 2;
                    ctx.globalAlpha = opacity * 0.4;
                    ctx.fillRect(t.x + 1, t.y + 1, TILE_SIZE - 1, TILE_SIZE - 1);
                }
                animationFrame = requestAnimationFrame(animate);
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    isVisible = entries[0].isIntersecting;
                    if (isVisible) animate(performance.now());
                    else cancelAnimationFrame(animationFrame);
                },
                { threshold: 0.01 }
            );

            observer.observe(bg);

            let resizeTimer;
            const resizer = new ResizeObserver(() => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(rebuild, 200);
            });
            resizer.observe(bg);

            rebuild();
        }

        document.querySelectorAll('.card-grid-bg').forEach(initGrid);
    });
});
