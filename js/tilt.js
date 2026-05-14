async function initTilt() {
    try {
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'libs/vanilla-tilt.min.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });

        const projectCards = document.querySelectorAll('.project-card');

        if (projectCards.length > 0) {
            VanillaTilt.init(projectCards, {
                max: 5,
                speed: 2000,
                glare: true,
                'max-glare': 0.2,
                gyroscope: false,
                easing: 'cubic-bezier(.03,.98,.52,.99)',
            });
        }
    } catch (err) {
        console.error('Vanilla-Tilt failed to load:', err);
    }
}

if (document.readyState === 'complete') {
    initTilt();
} else {
    window.addEventListener('load', initTilt);
}
