const globeEl = document.getElementById('hero-globe');

window.addEventListener('scroll', () => {
    // Get the position of the globe's parent container
    // (Assuming the parent is the top section of your site)
    const scrollY = window.scrollY;

    if (scrollY > 1500) {
        // If we've scrolled more than 50px, stick it!
        globeEl.classList.add('is-fixed');
    } else {
        // If we are back at the very top, let it be absolute
        globeEl.classList.remove('is-fixed');
    }
});
