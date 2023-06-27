const minimumInput = document.querySelector('.minimum-input');
const maximumInput = document.querySelector('.maximum-input');
const quantityInput = document.querySelector('.quantity-input');

const resultWrapper = document.querySelector('.result');


document.querySelector('.submit').addEventListener('click', () => {
  const minimum = parseFloat(minimumInput.value);
  const maximum = parseFloat(maximumInput.value);
  const quantity = parseFloat(quantityInput.value);
  const generatedNumbers = [];
  resultWrapper.innerHTML = ``;
  resultWrapper.innerHTML = `
  <button class="copy-button">
    <span class="material-symbols-sharp">content_copy</span>
  </button>
  `;

  for (let i = 0; i < quantity; i++) {
    const rng = (Math.floor((Math.random()) * (maximum - minimum + 1)) + minimum);
    resultWrapper.innerHTML += `<p>${rng}</p>`;
    generatedNumbers.push(rng)
  }

  copyFunction(generatedNumbers)
});

const copyFunction = (generatedNumbers) => { 
  document.querySelector('.copy-button').addEventListener('click', () => {
    navigator.clipboard.writeText(generatedNumbers.join('-'));
  });
}

