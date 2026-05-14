document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.edu-bg-grid');
    if (!grid) return;

    const rect = grid.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    grid.style.setProperty('--mouse-x', `${x}px`);
    grid.style.setProperty('--mouse-y', `${y}px`);
});
