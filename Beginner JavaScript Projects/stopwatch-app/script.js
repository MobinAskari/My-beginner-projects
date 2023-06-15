const daysElement = document.getElementById('days');
const hoursElement =  document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const actionElement = document.getElementById('action');
const resetElement = document.getElementById('reset');

let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
let intervalId = 0;

actionElement.addEventListener('click', () => {

  if (actionElement.innerText === 'Start') {
    actionElement.innerText = 'Stop';
    intervalId =  setInterval(() => {
      seconds++;
      secondsElement.innerText = seconds;
  
      if (seconds === 60) {
        seconds = 0;
        seconds++;
        minutes++;
        minutesElement.innerText = minutes;
      }
  
      if (minutes === 60) {
        minutes = 0;
        minutes++;
        hours++;
        hoursElement.innerText = hours; 
      }
  
      if (hours === 24) {
        hours = 0;
        hours++;
        days++;
        daysElement.innerText = days;
      }
    }, 1000);
  } else if (actionElement.innerText === 'Stop') {
    actionElement.innerText = 'Start';
    clearInterval(intervalId);
  }

});

resetElement.addEventListener('click', () => {
  days = 0;
  daysElement.innerText = days;
  hours = 0;
  hoursElement.innerText = hours; 
  minutes = 0;
  minutesElement.innerText = minutes;
  seconds = 0;
  secondsElement.innerText = seconds;
});

  





