document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const sections = document.querySelectorAll('section[id]');

    // 1. The Observer Configuration
    const options = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
    };

    // 2. The Callback Function
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute('id');
            const currentLink = document.querySelector(`.nav-links li a[href="#${id}"]`);

            if (entry.isIntersecting) {
                // When a section enters, remove active from all and add to this one
                navLinks.forEach((link) => link.classList.remove('active-link'));
                if (currentLink) currentLink.classList.add('active-link');
            } else {
                // When a section leaves, if it was the active one, remove the class
                if (currentLink && currentLink.classList.contains('active-link')) {
                    currentLink.classList.remove('active-link');
                }
            }
        });
    }, options);

    // 3. Start Watching Sections
    sections.forEach((section) => observer.observe(section));
});
