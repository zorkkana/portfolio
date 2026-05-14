const globeEl = document.getElementById('hero-globe');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 1500) {
        globeEl.classList.add('is-fixed');
    } else {
        globeEl.classList.remove('is-fixed');
    }
});
