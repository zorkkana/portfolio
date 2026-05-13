const initTypewriter = () => {
    const elements = document.querySelectorAll('.auto-type');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const el = entry.target;
                const text = el.getAttribute('data-text');

                if (entry.isIntersecting) {
                    // Trigger typing if it's not already running
                    if (!el.typedInstance) {
                        el.innerText = '';
                        el.style.visibility = 'visible';
                        el.style.opacity = '1';

                        el.typedInstance = new Typed(el, {
                            strings: [text],
                            typeSpeed: 50,
                            showCursor: false,
                        });
                    }
                } else {
                    // ONLY reset if the element is ABOVE the viewport
                    // entry.boundingClientRect.top > 0 means it went off the top
                    if (entry.boundingClientRect.top > 0) {
                        if (el.typedInstance) {
                            el.typedInstance.destroy();
                            el.typedInstance = null;
                        }
                        el.innerText = '';
                        el.style.visibility = 'hidden';
                    }
                }
            });
        },
        {
            threshold: 0, // Using 0 ensures it triggers exactly when it leaves
            rootMargin: '0px',
        }
    );

    elements.forEach((el) => {
        el.setAttribute('data-text', el.innerText);
        el.innerText = '';
        el.style.visibility = 'hidden';
        observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', initTypewriter);
