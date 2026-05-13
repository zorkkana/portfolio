document.addEventListener('mousemove', (e) => {
    const grid = document.querySelector('.edu-bg-grid');
    if (!grid) return;

    const rect = grid.getBoundingClientRect();

    // Calculate position relative to the grid element itself
    // Math: Mouse position - Grid's starting edge = Corrected Coordinate
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    grid.style.setProperty('--mouse-x', `${x}px`);
    grid.style.setProperty('--mouse-y', `${y}px`);
});
