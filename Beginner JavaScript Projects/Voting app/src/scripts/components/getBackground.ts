export const getBackground = (): HTMLDivElement => {
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('bg-con');

  containerDiv.innerHTML = `
    <div class="wave"></div>
    <div class="wave"></div>
    <div class="wave"></div>
  `;

  return containerDiv;
}