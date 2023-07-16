import { addToForm, amountElements } from "./components.js";

addToForm()

amountElements( [
  {
    id: "tip-amount",
    strong: 'Tip Amount',
    p: '/ Person'
  },
  {
    id: "total-amount",
    strong: 'Total',
    p: '/ Person'
  },
  {
    id: "final-total-amount",
    strong: 'Total',
    p: null
  }
]);

let bill;
let percentage;
let people;

const billInput = document.getElementById('bill-input')
const tipPercentageInput = document.querySelector('.tip-percentage_element.input');
const numberOfPeopleInput = document.getElementById('number-of-people-input');

const alertElements = document.querySelectorAll('.alert');

const tipPercentageButtons = document.querySelectorAll('.tip-percentage_element.button');

billInput.addEventListener('keyup', () => {
  validateInputs()
});
tipPercentageInput.addEventListener('keyup', () => {
  tipPercentageButtons.forEach(btn => btn.classList.remove('active'))
  validateInputs()
});
numberOfPeopleInput.addEventListener('keyup', () => {
  validateInputs()
});

tipPercentageButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      btn.classList.remove('active')
      percentage = undefined;
      tipPercentageInput.value = ''
    } else {
      tipPercentageButtons.forEach(btn => btn.classList.remove('active'))
      btn.classList.toggle('active');
      percentage = parseFloat(btn.textContent);
      tipPercentageInput.value = percentage;
      validateInputs()
    }
  });
});

function validateInputs() {
  const inputs = [
    billInput,
    tipPercentageInput,
    numberOfPeopleInput,
  ];

  const isOkay = inputs.every((input, i) => {
    if (parseFloat(input.value[0]) === 0 || input.value.length === 0) {
      input.style.setProperty('--border-color', 'red');      
      if (!percentage) {
        alertElements[i].style.opacity = 1;
      } else {
        tipPercentageInput.style.setProperty('--border-color', 'transparent')
        alertElements[1].style.opacity = 0;        
      }
    } else {
      input.style.setProperty('--border-color', 'hsl(172, 67%, 45%)');
      alertElements[i].style.opacity = 0;
      bill = billInput.value;
      percentage = tipPercentageInput.value;
      people = numberOfPeopleInput.value;
      return true;
    }
  });

  isOkay ? calculate() : ''  
}

const tipAmountElement = document.getElementById('tip-amount')
const totalAmountElement = document.getElementById('total-amount');
const finalTotalAmount = document.getElementById('final-total-amount')

function calculate() {
  bill = parseFloat(bill)
  people = parseFloat(people)
  
  const tipAmount = (bill * (percentage / 100));
  
  const total = bill + tipAmount;
  
  const tipAmountPerPerson = tipAmount / people;
  const totalPerPerson = total / people;

  tipAmountElement.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
  totalAmountElement.textContent = `$${totalPerPerson.toFixed(2)}`;
  finalTotalAmount.textContent = `$${total.toFixed(2)}`
}

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => {
  bill = undefined;
  percentage = undefined;
  people = undefined;

  tipPercentageButtons.forEach(btn => btn.classList.remove('active'));

  billInput.value = '';
  tipPercentageInput.value = '';
  numberOfPeopleInput.value = '';

  tipAmountElement.textContent = '$0.00';
  totalAmountElement.textContent = '$0.00';
  finalTotalAmount.textContent = '$0.00';
});