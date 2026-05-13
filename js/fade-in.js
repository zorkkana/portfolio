document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    if (entry.boundingClientRect.top > 0) {
                        entry.target.classList.remove('animate');
                    }
                }
            });
        },
        { threshold: 0.1 }
    );

    const selectors =
        '.sh-line,.fade-in, h2, .btn, .avatar, .bio p, .project-card, .experience-card, .languages, .company-logo, .logo-cluster-container, .terminal-window, .contact form, .skills span';

    document.querySelectorAll(selectors).forEach((element) => {
        observer.observe(element);
    });

    // INSTEAD of transitionDelay, we inject a CSS Variable (--stagger-delay)
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.setProperty('--stagger-delay', `${index * 0.1}s`);
    });

    document.querySelectorAll('.skills span').forEach((skill, index) => {
        skill.style.setProperty('--stagger-delay', `${index * 0.025}s`);
    });
});
