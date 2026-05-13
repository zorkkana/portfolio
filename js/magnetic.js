const magneticElements = document.querySelectorAll('.magnetic');

const activationDistance = 80;
const pullStrength = 0.4;

window.addEventListener('mousemove', (e) => {
    // ONLY run if the screen is wider than 768px
    if (window.innerWidth > 768) {
        magneticElements.forEach((el) => {
            const rect = el.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            const distance = Math.hypot(distanceX, distanceY);

            if (distance < activationDistance) {
                const power = (activationDistance - distance) / activationDistance;

                const x = distanceX * power * pullStrength;
                const y = distanceY * power * pullStrength;

                el.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
            } else {
                el.style.transform = `translate(0px, 0px) scale(1)`;
            }
        });
    } else {
        // Force reset on mobile just in case of screen rotation
        magneticElements.forEach((el) => {
            el.style.transform = 'translate(0px, 0px) scale(1)';
        });
    }
});
