const form = document.querySelector('.contact-form');
const modal = document.getElementById('thankYouModal');
const modal2 = document.getElementById('whatareudoung');

form.onsubmit = async (e) => {
    e.preventDefault(); // Stop the page from refreshing

    const formData = new FormData(form);

    // Send data to Formspree via AJAX
    const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
        },
    });

    if (response.ok) {
        // Show the popup
        modal.classList.add('active');
        // Clear the form
        form.reset();
    } else {
        alert('Oops! There was a problem sending your message.');
    }
};

function closeModal() {
    modal.classList.remove('active');
}

function closeModal2() {
    modal2.classList.remove('active');
}
