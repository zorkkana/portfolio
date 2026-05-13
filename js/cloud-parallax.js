(function () {
    const divider = document.getElementById('cloud-divider');
    const layers = divider.querySelectorAll('.cloud-layer');
    const speeds = [0.04, 0.08, 0.14];

    let isVisible = false;
    let scrollY = window.scrollY;

    // CACHE THESE VALUES OUTSIDE THE UPDATE LOOP
    let dividerTop = 0;
    let dividerHeight = 0;
    let viewH = window.innerHeight;

    function measure() {
        dividerTop = divider.offsetTop;
        dividerHeight = divider.offsetHeight;
        viewH = window.innerHeight;
    }

    // Initial measure
    measure();

    // Re-measure only when the user resizes the window (not every frame!)
    window.addEventListener('resize', measure, { passive: true });

    const observer = new IntersectionObserver(
        (entries) => {
            isVisible = entries[0].isIntersecting;
            if (isVisible) requestAnimationFrame(update);
        },
        { threshold: 0 }
    );

    observer.observe(divider);

    window.addEventListener(
        'scroll',
        () => {
            scrollY = window.scrollY;
        },
        { passive: true }
    );

    function update() {
        if (!isVisible) return;

        // NO DOM READS HERE - Use the cached variables
        const dividerCenter = dividerTop + dividerHeight / 2;
        const progress = 1 - (dividerCenter - scrollY) / viewH;

        for (let i = 0; i < layers.length; i++) {
            const px = progress * speeds[i] * 100;
            // translate3d is correct, but use 'px' unit and avoid unnecessary toFixed if possible
            layers[i].style.transform = `translate3d(${px}px, 0, 0)`;
        }

        requestAnimationFrame(update);
    }
})();
