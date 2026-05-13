async function initTilt() {
    try {
        // 1. Lazy load the local Tilt library
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'libs/vanilla-tilt.min.js'; // Local path
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });

        // 2. Initialize the 3D effect
        // We check if cards exist first to avoid errors
        const projectCards = document.querySelectorAll('.project-card');

        if (projectCards.length > 0) {
            VanillaTilt.init(projectCards, {
                max: 5, // Max tilt angle
                speed: 2000, // Speed of transition
                glare: true, // Adds a "shine" effect
                'max-glare': 0.2,
                gyroscope: false,
                easing: 'cubic-bezier(.03,.98,.52,.99)',
            });
        }
    } catch (err) {
        console.error('Vanilla-Tilt failed to load:', err);
    }
}

// Trigger the load once the window is ready
if (document.readyState === 'complete') {
    initTilt();
} else {
    window.addEventListener('load', initTilt);
}
