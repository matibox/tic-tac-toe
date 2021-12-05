const background = document.querySelector('main');
const lightBtn = document.getElementById('light-mode');
const darkBtn = document.getElementById('dark-mode');
const darkAnimationTime = 1; // In seconds
const lightAnimationTime = 0.75; // In seconds

lightBtn.addEventListener('click', () => {
    background.classList.remove('dark');
    lightBtn.style.animation = `rotation ${darkAnimationTime}s ease-out`;
    setTimeout(() => (lightBtn.style.animation = ''), darkAnimationTime * 1000);
});

darkBtn.addEventListener('click', () => {
    background.classList.add('dark');
    darkBtn.style.animation = `rotation ${lightAnimationTime}s ease-out`;
    setTimeout(() => (darkBtn.style.animation = ''), lightAnimationTime * 1000);
});
