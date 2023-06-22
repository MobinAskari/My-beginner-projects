const rightSectionContainer = document.querySelector('.right-section');

const cardOwnerElement = document.querySelector('.card-owner');

const cardNumberSpans = document.querySelectorAll('.number');

const CVVSpans = document.querySelectorAll('.cvv');

const dateSpans = document.querySelectorAll('.date');

const jsCardholderNameInput = document.querySelector('.js-cardholder-name');
const jsCardnumberInput = document.querySelector('.js-cardnumber');
const jsCVVInput = document.querySelector('.js-cvv');
const jsDateYYinput = document.querySelector('.js-date-yy');
const jsDateMMinput = document.querySelector('.js-date-mm');

const errMessages = document.querySelectorAll('.err-message');

const confirmButton = document.querySelector('.confirm-button');

jsCardholderNameInput.addEventListener('keyup', () => {
  if (isNaN(jsCardholderNameInput.value)) {
    cardOwnerElement.innerText = jsCardholderNameInput.value  
    jsCardholderNameInput.classList.remove('red')
    jsCardholderNameInput.classList.add('green')
  } else {
    jsCardholderNameInput.classList.add('red')
  }
});

jsCardnumberInput.addEventListener('keyup', (e) => {

  if (isNaN(jsCardnumberInput.value)) {
    jsCardnumberInput.classList.add('red');
  } else {
    jsCardnumberInput.classList.remove('red');
    jsCardnumberInput.value.length >= 16 ? jsCardnumberInput.classList.add('green') : jsCardnumberInput.classList.remove('green');

    cardNumberSpans.forEach((numberSpan, index) => {    
     jsCardnumberInput.value[index] ? numberSpan.innerText = jsCardnumberInput.value[index] : numberSpan.innerText = 0;
    });
  }
  

});

jsCVVInput.addEventListener('keyup', () => {

  if (isNaN(jsCVVInput.value)) {
    jsCVVInput.classList.add('red');
  } else {
    jsCVVInput.classList.remove('red');
    
    jsCVVInput.value.length >= 3 ? jsCVVInput.classList.add('green') : jsCardnumberInput.classList.remove('green');

    CVVSpans.forEach((CVVSpan, index) => {
      jsCVVInput.value[index] ? CVVSpan.innerText = jsCVVInput.value[index] : CVVSpan.innerText = 0; 
    });
  }
22
});

jsDateYYinput.addEventListener('keyup', () => {

  if (isNaN(jsDateYYinput.value)) {
    jsDateYYinput.classList.add('red');
  } else {
    jsDateYYinput.classList.remove('red');    
    dateSpans.forEach((dateSpan, index) => {
      jsDateYYinput.value[0] ? dateSpans[2].innerText = jsDateYYinput.value[0] : dateSpans[2].innerText = 0;
  
      jsDateYYinput.value[1] ? dateSpans[3].innerText = jsDateYYinput.value[1] : dateSpans[3].innerText = 0;
    });
  }

});

jsDateMMinput.addEventListener('keyup', () => {

  if (isNaN(jsDateMMinput.value)) {
    jsDateMMinput.classList.add('red');
  } else {
    jsDateMMinput.classList.remove('red');  
    dateSpans.forEach((dateSpan, index) => {
      jsDateMMinput.value[0] ? dateSpans[0].innerText = jsDateMMinput.value[0] : dateSpans[0].innerText = 0;
  
      jsDateMMinput.value[1] ? dateSpans[1].innerText = jsDateMMinput.value[1] : dateSpans[1].innerText = 0;
    });
  }
});

confirmButton.addEventListener('click', () => {
  validateInputs();
});

function validateInputs() {
  const inputs = [
    jsCardholderNameInput,
    jsCardnumberInput,
    jsDateMMinput,
    jsDateYYinput,
    jsCVVInput,
  ];

  inputs.forEach((input, index) => {
    input.value != '' ? input.classList.remove('red') + errMessages[index].classList.remove('shown') : input.classList.add('red') + errMessages[index].classList.add('shown')
  });

  if (
    jsCardholderNameInput.value != '' &&
    jsCardnumberInput.value != '' &&
    jsDateMMinput.value != '' &&
    jsDateYYinput.value != '' &&
    jsCVVInput.value != '' 
  ) {
    showSuccessMessage(inputs)
  }

}

function showSuccessMessage(inputs) {
  rightSectionContainer.innerHTML = ``;

  rightSectionContainer.innerHTML = `
    <div class="message-container">
      <img src="images/icon-complete.svg" alt="" class="continue-img">
      <h2>THANK YOU</h2>  
      <p>We've added your credit card details!</p>
      <button class="btn-style continue-button">continue</button>
    </div>
  `;

  document.querySelector('.continue-button').addEventListener('click', () => {
    location.reload()
  })
}


