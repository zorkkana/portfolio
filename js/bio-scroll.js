const container = document.querySelector('#typed-container');
const textElement = document.querySelector('#biotyped');

// Your bio text
const text =
    'I am Oskari, a 20 year old programmer who is really into building things that actually work. I am in charge of Portawebia Oy, where I spend my days and most of my nights working on web development and software engineering. My life has not been straightforward. I have been all over the place from internships in Germany to starting my own company always trying to solve real problems with code. When I am not staring at the screen I like to look up at the sky. I am really interested in space and how things work. My big goal is to bring these two things using my programming skills to help people get to the stars.';

// 1. Break text into words and wrap them in spans
const wordsArray = text.split(' ');
textElement.innerHTML = wordsArray
    .map((word) => `<span class="scroll-word">${word}</span>`)
    .join(' ');

// Get all the newly created spans
const wordElements = document.querySelectorAll('.scroll-word');

// 2. The function that calculates the scroll effect
function handleScrollReveal() {
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Defines the trigger zones.
    // Start revealing when the container is 80% down the screen
    const start = windowHeight * 0.8;
    // Finish revealing when the container is 30% down the screen
    const end = windowHeight * 0.3;

    // Calculate how far along the scroll track we are (0 to 1)
    const totalDistance = start - end;
    let progress = (start - rect.top) / totalDistance;

    // Lock progress between 0 and 1 so it doesn't break when scrolling past
    progress = Math.max(0, Math.min(1, progress));

    // Calculate which word should be the "current" clear word based on progress
    const currentWordIndex = progress * wordsArray.length;

    // Loop through all words and apply styles based on their distance from the current word
    wordElements.forEach((word, index) => {
        // Distance from the active scroll point
        const distance = index - currentWordIndex;

        if (distance < 0) {
            // Word is behind the scroll point (fully revealed)
            word.style.opacity = 1;
            word.style.filter = 'blur(0px)';
        } else if (distance < 6) {
            // The "Blur Zone" for the next ~6 words ahead of the scroll point
            const blurAmount = distance * 1.5; // Starts small, maxes out around 9px
            const opacityAmount = 1 - distance * 0.15; // Gradually fades out

            word.style.opacity = opacityAmount;
            word.style.filter = `blur(${blurAmount}px)`;
        } else {
            // Words further down that haven't been reached yet
            word.style.opacity = 0;
            word.style.filter = 'blur(10px)';
        }
    });
}

// 3. Attach the function to the scroll event
window.addEventListener('scroll', handleScrollReveal);

// 4. Run it once immediately on load in case the user refreshes halfway down the page
handleScrollReveal();
