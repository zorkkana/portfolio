window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';

    // Calculate the scroll percentage
    const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;

    // Apply it to the width
    document.getElementById('scroll-line').style.width = percent + '%';
});
