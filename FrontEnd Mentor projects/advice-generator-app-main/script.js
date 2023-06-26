const API = `https://api.adviceslip.com/advice`;

const adviceID = document.querySelector('.advice-id');
const adviceText = document.querySelector('.advice-text');
const imgWrapper = document.querySelector('.img-wrapper')
const getAdviceButton = document.querySelector('.get-advice');

getAdviceButton.addEventListener('click', () => {
  getAdvice();
})

async function getAdvice() {
  const data = await fetch(API);
  const result = await data.json();
  
  adviceID.innerText = result.slip.id;
  adviceText.innerText = result.slip.advice;
}

window.addEventListener('resize', () => {
  window.innerWidth <= 325 ? imgWrapper.innerHTML = `<img src="images/pattern-divider-mobile.svg" alt="">` : '';
})