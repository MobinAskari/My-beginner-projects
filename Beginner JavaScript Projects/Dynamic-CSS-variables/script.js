const inputsWrapper = document.querySelector('.inputs-wrapper');
const userIdInput = document.getElementById('user-id');
const userPassswordInput = document.getElementById('user-password');


const loginBtn = document.getElementById('login');
const cancelBtn = document.getElementById('cancel');
cancelBtn.addEventListener('click', () => {
  userIdInput.value = '';
  userPassswordInput.value = '';

  changeValue(userPassswordInput, '--color', 'white');
  changeValue(userIdInput, '--color', 'white');
  
  changeValue(userPassswordInput, '--font-size', '1rem');
  changeValue(userPassswordInput, '--font-size', '1rem');
  
});

const userId = 'testuser';
const userPassword = 'mypassword';

userIdInput.addEventListener('keyup', () => {
  validateInputs(event, userIdInput);
});


userPassswordInput.addEventListener('keyup', () => {
  validateInputs(event, userPassswordInput);
});

let userIdParam = false;
let passwordParam = false;

function validateInputs (event, input) {

  if (event.key === ' ') {

    showMessage('No Spaces');
        
    changeValue(input, '--color', 'yellow');

  } 
  
  if (event.key) {
    evaluatePassword();
  }   
  
}

loginBtn.addEventListener('click', () => {
  if (userIdInput.value === '' || userPassswordInput.value === '') {
   showMessage('Inputs must not be empty');
   return;
  }
  if (userIdParam === true && passwordParam === true) {
    validateLogin(userIdInput.value, userPassswordInput.value);
  }
});

function validateLogin (username, password) {
  
  if (username !== userId || password !== userPassword) {
   
    showMessage('userID or Password is incorrect');
    
    changeValue(userPassswordInput, '--color', 'red');
    changeValue(userIdInput, '--color', 'red');
    
    changeValue(userPassswordInput, '--font-size', '1.5rem');
    changeValue(userPassswordInput, '--font-size', '1.5rem');

    return;
  }


  if (username === userId && password === userPassword) {

    showMessage('Welcome');
        
    changeValue(userPassswordInput, '--color', 'green');
    changeValue(userIdInput, '--color', 'green');

    changeValue(userPassswordInput, '--font-size', '1rem');
    changeValue(userPassswordInput, '--font-size', '1rem');
    
  }

}


function evaluatePassword() {
  for (let i = 0; i < userIdInput.value.length; i++) {
    if (userIdInput.value[i] === ' ') {
      userIdParam = false;
      return;
    }
  }
  for (let i = 0; i < userPassswordInput.value.length; i++) {
    if (userPassswordInput.value[i] === ' ') {
      passwordParam = false;
      return;
    }
  }

  for (let i = 0; i < userIdInput.value.length; i++) {
    if (userIdInput.value[i] !== ' ') {
      userIdParam = true;
      changeValue(userIdInput, '--color', 'white');
    }
  }
  for (let i = 0; i < userPassswordInput.value.length; i++) {
    if (userPassswordInput.value[i] !== ' ') {
      passwordParam = true;
      changeValue(userPassswordInput, '--color', 'white');
    }
  }
}


let timeoutId;

function showMessage(messageText) {
  const message = document.createElement('p');
  message.innerText = messageText;
  inputsWrapper.appendChild(message);

  timeoutId = setTimeout(() => {
    inputsWrapper.removeChild(message);
  }, 1500);
}


function changeValue(input, property, color) {

  input.style.setProperty(property, color);

}