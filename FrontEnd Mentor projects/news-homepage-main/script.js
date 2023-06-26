const openMenuButton = document.querySelector('.open-menu-btn');
const closeButton = document.querySelector('.close-btn');
const menuUlELement = document.querySelector('.menu-ul');
const overlay = document.querySelector('.overlay');

openMenuButton.addEventListener('click', () => {

  menuUlELement.classList.add('menu-open');
  overlay.classList.add('shown');
});

closeButton.addEventListener('click', () => {

  menuUlELement.classList.remove('menu-open');
  overlay.classList.remove('shown');

});

// one of the worst menus i've designed. should started with the menu styles when it's opened at first