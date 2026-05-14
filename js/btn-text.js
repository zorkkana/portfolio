document.querySelectorAll('.btn, .btn-hollow').forEach(button => {
    const text = button.innerText.trim();
    button.innerHTML = '';

    button.classList.add('stagger-btn');

    [...text].forEach((letter, i) => {
        const span = document.createElement('span');
        span.className = 'btn-letter-wrap';

        span.style.setProperty('--index', i);

        const ch = letter === ' ' ? '&nbsp;' : letter;
        span.innerHTML =
            `<span class="btn-letter-top">${ch}</span>` +
            `<span class="btn-letter-bottom">${ch}</span>`;

        button.appendChild(span);
    });
});
