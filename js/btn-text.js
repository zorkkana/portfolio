// Target both primary and hollow buttons
document.querySelectorAll('.btn, .btn-hollow').forEach(button => {
    const text = button.innerText.trim();
    button.innerHTML = ''; // Clear the original text

    // Add a helper class to manage flex and overflow safely without breaking your CSS
    button.classList.add('stagger-btn');

    // Split text into individual letters
    [...text].forEach((letter, i) => {
        const span = document.createElement('span');
        span.className = 'btn-letter-wrap';
        
        // Note: I sped the stagger up slightly (0.02s vs 0.035s) 
        // so the button feels snappier to click, but you can adjust this!
        span.style.setProperty('--index', i);

        const ch = letter === ' ' ? '&nbsp;' : letter;
        span.innerHTML =
            `<span class="btn-letter-top">${ch}</span>` +
            `<span class="btn-letter-bottom">${ch}</span>`;
        
        button.appendChild(span);
    });
});
