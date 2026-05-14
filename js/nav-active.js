document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const sections = document.querySelectorAll('section[id]');

    const options = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id');
            const currentLink = document.querySelector(`.nav-links li a[href="#${id}"]`);

            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove('active-link'));
                if (currentLink) currentLink.classList.add('active-link');
            } else {
                if (currentLink && currentLink.classList.contains('active-link')) {
                    currentLink.classList.remove('active-link');
                }
            }
        });
    }, options);

    sections.forEach((section) => observer.observe(section));
});
