export const generateContainer = (): HTMLElement => {
  const body = document.body;

  let container = document.querySelector('.container') as HTMLElement;

  const handleClasses = () => {
    const classes = [...container.classList];
    classes.forEach(className => container?.classList.remove(className));
    container?.classList.add('container');
  }

  if (container) {
    container.innerHTML = ``;
    handleClasses();
  }
  else {
    container = document.createElement('main');

    handleClasses();
    body.appendChild(container);
  }

  return container;
}