const initTypewriter = () => {
    const elements = document.querySelectorAll('.auto-type');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const el = entry.target;
                const text = el.getAttribute('data-text');

                if (entry.isIntersecting) {
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
                    // only reset when scrolled past the top — keeps it intact while scrolling down
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
            threshold: 0,
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
