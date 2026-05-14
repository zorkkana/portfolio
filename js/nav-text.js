document.querySelectorAll('.nav-links a .nav-text').forEach((textSpan) => {
    const text = textSpan.innerText.trim();
    textSpan.innerHTML = '';

    [...text].forEach((letter, i) => {
        const span = document.createElement('span');
        span.className = 'letter-wrap';
        span.style.setProperty('--index', i);

        const ch = letter === ' ' ? '&nbsp;' : letter;
        span.innerHTML =
            `<span class="letter-top">${ch}</span>` +
            `<span class="letter-bottom">${ch}</span>`;

        textSpan.appendChild(span);
    });
});
