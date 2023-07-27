import { encryptOrDecrypt } from "./converter.js";

const messageInput = document.getElementById('message');
const keyInput = document.getElementById('key');
const resultInput = document.getElementById('result');
const encryptButton = document.getElementById('encrypt');
const decryptButton = document.getElementById('decrypt');

const messageInputAlert = document.querySelector('.messageInputAlert');
const keyInputAlert = document.querySelector('.keyInputAlert');

encryptButton.addEventListener('click', () => {
  const isMessageOk = validateInput(messageInput, messageInputAlert);
  const isKeyOk = validateInput(keyInput, keyInputAlert);
  
  if (isMessageOk && isKeyOk) {
    resultInput.value = encryptOrDecrypt(messageInput.value, keyInput.value, 'encrypt')
  }
});

decryptButton.addEventListener('click', () => {
  const isMessageOk = validateInput(messageInput, messageInputAlert);
  const isKeyOk = validateInput(keyInput, keyInputAlert);
  
  if (isMessageOk && isKeyOk) {
    resultInput.value = encryptOrDecrypt(messageInput.value, keyInput.value, 'decrypt')
  }
});

const validateInput = (input, alertEl) => {
  const inputVal = input.value;
  
  if (inputVal.length === 0) {
    alertEl.textContent = 'Input cannot be empty';
    return false;
  } else {
    alertEl.textContent = '';
  }
  
  if (input === keyInput) {
    const includesNumber = inputVal.split('').some(char => !isNaN(parseFloat(char)));

    if (inputVal.length < 2) {
      alertEl.textContent = 'The key must be at least 2 characters long'; 
      return false;
    } else if (includesNumber) {
      alertEl.textContent = 'Must not include anything other than alphabet characters'
      return false;
    } else {
      alertEl.textContent = ''
      return true;
    }
  } 

  return true;
}