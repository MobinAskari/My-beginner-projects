export const toggleMenu = () => {
  const overlay = document.querySelector('[data-overlay]');
  const headernav = document.querySelector('[data-headernav]');
  const openMenu = document.querySelector('[data-openheadermenu]');
  const closeMenu = document.querySelector('[data-closeheadermenu]');

  const toggleState = () => {
    openMenu.classList.toggle('hidden');
    closeMenu.classList.toggle('hidden');
    headernav.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
  }

  openMenu.addEventListener('click', toggleState);
  closeMenu.addEventListener('click', toggleState);
}

toggleMenu()