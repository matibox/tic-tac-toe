const background = document.querySelector('main');
const lightBtn = document.getElementById('light-mode');
const darkBtn = document.getElementById('dark-mode');

lightBtn.addEventListener('click', () => {
    background.classList.remove('dark');
    lightBtn.style.animation = 'rotation 1s ease-out';
    setTimeout(() => (lightBtn.style.animation = ''), 1000);
});

darkBtn.addEventListener('click', () => {
    background.classList.add('dark');
    darkBtn.style.animation = 'rotation 0.75s ease-out';
    setTimeout(() => (darkBtn.style.animation = ''), 750);
});
