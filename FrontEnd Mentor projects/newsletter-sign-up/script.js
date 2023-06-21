const mainContainer = document.querySelector('.main-container');

const errMessage = document.querySelector('.err-message');
const jsEmailInput = document.querySelector('.js-email-input');
const submitButton = document.querySelector('.js-submit-button');


submitButton.addEventListener('click', () => {
  if(!jsEmailInput.value) {
    errMessage.innerText = 'Input is empty!';
    errMessage.classList.remove('hidden');
    jsEmailInput.classList.add('err')
  } else {
    errMessage.classList.add('hidden');
    jsEmailInput.classList.remove('err');

    showMessage(validateInput(jsEmailInput.value));
  }
});

function validateInput(email) {
  const validator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validator.test(email);
}

function showMessage(value) {
  const message = () => {
    mainContainer.innerHTML = ``;
    mainContainer.classList.toggle('message-layout')
    mainContainer.innerHTML = `
    <img src="assets/images/icon-list.svg" alt=""> 
    <h1>Thanks for subscribing!</h1>

    <p>
    A confirmation email has been sent to ${jsEmailInput.value}. 
    Please open it and click the button inside to confirm your subscription.
    </p>

    <button class="js-dismiss-button">Dismiss message</button>
    `;
    
  }
  // m2@gamil.com

  const err = () => {
    errMessage.innerText = 'Valid email required';
    errMessage.classList.remove('hidden');
    jsEmailInput.classList.add('err');
  }
  value ? message() : err();
  document.querySelector('.js-dismiss-button').addEventListener('click', () => {
    location.reload();
  })
}

