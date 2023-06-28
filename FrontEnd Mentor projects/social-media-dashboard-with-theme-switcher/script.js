const toggleWrapper = document.querySelector('.toggle-wrapper');
const toggleIndicator = document.querySelector('.toggle-indicator');
const currentMode = document.querySelector('.current-mode');

let selectedMode = localStorage.getItem('theme') ?? 'darkmode';
selectedMode === 'darkmode' ? toggleIndicator.classList.remove('off') : toggleIndicator.classList.add('off');
document.body.classList.toggle(selectedMode);


toggleWrapper.addEventListener('click', () => {
  document.body.classList.remove(selectedMode);

  if (selectedMode === 'darkmode') {
    toggleIndicator.classList.add('off');
    selectedMode = 'lightmode';
    toggleWrapper.style.background = 'var(--toggle)';
  } else {
    toggleIndicator.classList.remove('off')
    selectedMode = 'darkmode'
    toggleWrapper.style.background = 'linear-gradient(var(--toggle))'
  }

  document.body.classList.add(selectedMode);
  localStorage.setItem('theme', selectedMode)
});