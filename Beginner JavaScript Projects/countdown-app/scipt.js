const eventName = document.getElementById('event-name');

const days = document.getElementById('days');
const hours = document.getElementById('hours'); 
const minutes = document.getElementById('minutes'); 
const seconds = document.getElementById('seconds'); 

const eventNameInput = document.getElementById('input-event-name');
const eventDateInput = document.getElementById('input-event-date');
const eventTimeInput = document.getElementById('input-event-time');

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', () => {
  startCalculation(eventNameInput.value, eventDateInput.value, eventTimeInput.value);
});

function calculateAndShowDate(userNameInput, userDateInput, userTimeInput) {
  let userDate;
  if (userDateInput && userTimeInput) {
    userDate = `${userDateInput} ${userTimeInput}`;
  }
  
  const formattedDate = new Date(userDate);
  const currentDate = new Date();
  const rawSeconds = (formattedDate - currentDate) / 1000;

  eventName.innerText = userNameInput;
  const secondsLeft = Math.floor(rawSeconds) % 60;
  const minutesLeft = Math.floor(rawSeconds / 60) % 60;
  const hoursLeft = Math.floor(rawSeconds / 3600) % 24;
  const daysLeft = Math.floor(rawSeconds / 3600 / 24);

  if (secondsLeft == 1 && minutesLeft == 0 && hoursLeft == 0 && daysLeft == 0) {
    alert('done');
    return;
  }

  if (rawSeconds < 0) {
    alert('Choose a okay date or smth');
    clearInterval(intervalId)
    return;
  }

  if (secondsLeft > 9) {
    seconds.innerText = secondsLeft;
  } else {
    seconds.innerText = '0'+secondsLeft;
  }
  if (minutesLeft > 9) {
    minutes.innerText = minutesLeft;
  } else {
    minutes.innerText = '0'+minutesLeft;
  }
  if (hoursLeft > 9) {
    hours.innerText = hoursLeft;
  } else {
    hours.innerText = '0'+hoursLeft;
  }
  if (daysLeft > 9) {
    days.innerText = daysLeft;
  } else {
    days.innerText = '0'+daysLeft;
  }

}

let intervalId;

function startCalculation(nameInput, dateInput, timeInput) {
  clearInterval(intervalId);

  if (!nameInput) {
    nameInput = 'Default';
  }
  if (!dateInput) {
    alert('enter a date');
    return;
  }
  if (!timeInput) {
    timeInput = "00:00";
  }

  //console.log(dateInput, timeInput);
  
  intervalId = setInterval(() => {
    calculateAndShowDate(nameInput, dateInput, timeInput);
  }, 1000);
}