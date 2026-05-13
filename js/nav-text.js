document.querySelectorAll('.nav-links a .nav-text').forEach((textSpan) => {
    const text = textSpan.innerText.trim();
    textSpan.innerHTML = ''; // Clear the text

    // Split text into individual letters
    [...text].forEach((letter, i) => {
        const span = document.createElement('span');
        span.className = 'letter-wrap';
        // Set the CSS variable for the stagger delay
        span.style.setProperty('--index', i);

        // Create the two layers of text
        const ch = letter === ' ' ? '&nbsp;' : letter;
        span.innerHTML =
            `<span class="letter-top">${ch}</span>` +
            `<span class="letter-bottom">${ch}</span>`;

        textSpan.appendChild(span);
    });
});
