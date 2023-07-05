import { updateLocalStorage } from "./datas.js";

const bodyEl = document.body;

const leftSidebarContainer = document.querySelector('.left-sidebar-container');
const sidebarButton = document.querySelector('.sidebar-button');
const overlayElement = document.querySelector('.overlay');

// const themeTogglerElement = document.getElementById('theme-toggler');

let currentTheme = JSON.parse(localStorage.getItem('theme')) ?? 'darkmode';

bodyEl.classList.add(currentTheme);

export const toggleTheme = () => {
  bodyEl.classList.remove(currentTheme)

  currentTheme === 'darkmode' ? currentTheme = 'lightmode' : currentTheme = 'darkmode';

  bodyEl.classList.add(currentTheme);

  updateLocalStorage('theme', currentTheme)
}

window.addEventListener('resize', () => {  
    if (window.outerWidth === 769) {
      if (!leftSidebarContainer.classList.contains('hidden')) {
        leftSidebarContainer.classList.add('hidden');
        bodyEl.style.setProperty('--sidebar-width', '0rem');
      }
    }
});


sidebarButton.addEventListener('click', () => {

  if (leftSidebarContainer.classList.contains('hidden')) {

    leftSidebarContainer.classList.remove('hidden');

    bodyEl.style.setProperty('--sidebar-width', '14rem');

    window.innerWidth <= 768 ? overlayElement.classList.add('shown') : '';

  } else {

    leftSidebarContainer.classList.add('hidden');
    bodyEl.style.setProperty('--sidebar-width', '0rem');
    overlayElement.classList.remove('shown');

  }   
});

