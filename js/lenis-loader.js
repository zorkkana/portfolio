window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.src = 'libs/lenis.min.js'; // Path to your file
    script.onload = () => {
        // Initialize Lenis only after the file is fully loaded
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        console.log('Lenis loaded lazily');
    };
    document.head.appendChild(script);
});
