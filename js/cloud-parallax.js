(function () {
    const divider = document.getElementById('cloud-divider');
    const layers = divider.querySelectorAll('.cloud-layer');
    const speeds = [0.04, 0.08, 0.14];

    let isVisible = false;
    let scrollY = window.scrollY;

    // cache layout reads — don't hit them every frame
    let dividerTop = 0;
    let dividerHeight = 0;
    let viewH = window.innerHeight;

    function measure() {
        dividerTop = divider.offsetTop;
        dividerHeight = divider.offsetHeight;
        viewH = window.innerHeight;
    }

    measure();

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

        const dividerCenter = dividerTop + dividerHeight / 2;
        const progress = 1 - (dividerCenter - scrollY) / viewH;

        for (let i = 0; i < layers.length; i++) {
            const px = progress * speeds[i] * 100;
            layers[i].style.transform = `translate3d(${px}px, 0, 0)`;
        }

        requestAnimationFrame(update);
    }
})();
