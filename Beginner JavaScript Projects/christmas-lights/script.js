const firstLightElement = document.getElementById('first');
const secondLightElement = document.getElementById('second');
const thirdLightElement = document.getElementById('third');
const fourthLightElement = document.getElementById('fourth');
const fifthLightElement = document.getElementById('fifth');
const sixthLightElement = document.getElementById('sixth');
const seventhLightElement = document.getElementById('seventh');

const interval1 = document.getElementById('interval1');
const interval2 = document.getElementById('interval2');
const submitInterval = document.getElementById('submit-interval');

// createInteval(500, 1000);
submitInterval.addEventListener('click', () => {
  if (interval1Set && interval2Set) {
    clearInterval(interval1Set);
    clearInterval(interval2Set);
  }
  if (!interval1.value || !interval2.value) {
	alert('Inputs are empty!');
  } else {
	createInteval(interval1.value, interval2.value);
  }
});


let colorRed =     '0px 0px 4px 10px hsla(0, 73%, 50%, 100%)';
let colorOrange =  '0px 0px 4px 10px hsla(39, 100%, 50%, 50%)'; 
let colorYellow =  '0px 0px 4px 10px hsla(60, 100%, 50%, 100%)'; 
let colorGreen =   '0px 0px 4px 10px hsla(120, 100%, 25%, 50%)';
let colorLightblue='0px 0px 4px 10px hsla(209, 100%, 50%, 100%)';
let colorBlue =    '0px 0px 4px 10px hsla(240, 100%, 50%, 50%)';
let colorPurple =  '0px 0px 4px 10px hsla(300, 100%, 25%, 100%)';

let interval1Set = false;
let interval2Set = false;

const startOrStop = document.getElementById('start-stop');

startOrStop.addEventListener('click', () => {
  if (interval1Set === false && interval2Set === false) {
    createInteval(1500, 1000);
    startOrStop.innerText = 'stop';
  } else {
    clearInterval(interval1Set);
    clearInterval(interval2Set);
    interval1Set = false;
    interval2Set = false;
    startOrStop.innerText = 'stopped, click to start';
  }
});

function createInteval(input1, input2) {
  interval1Set = setInterval(() => {
    firstLightElement.style.boxShadow = '0px 0px 4px 10px hsla(0, 73%, 50%, 50%)';
    secondLightElement.style.boxShadow ='0px 0px 4px 10px hsla(39, 100%, 50%, 100%)'; 
    thirdLightElement.style.boxShadow = '0px 0px 4px 10px hsla(60, 100%, 50%, 50%)';  
    fourthLightElement.style.boxShadow ='0px 0px 4px 10px hsla(120, 100%, 25%, 100%)'; 
    fifthLightElement.style.boxShadow = '0px 0px 4px 10px hsla(209, 100%, 50%, 50%)';
    sixthLightElement.style.boxShadow = '0px 0px 4px 10px hsla(240, 100%, 50%, 100%)';  
    seventhLightElement.style.boxShadow='0px 0px 4px 10px hsla(300, 100%, 25%, 50%)';
  }, input1); 
  
  interval2Set = setInterval(() => {
    firstLightElement.style.boxShadow = colorRed;
    secondLightElement.style.boxShadow = colorOrange; 
    thirdLightElement.style.boxShadow = colorYellow; 
    fourthLightElement.style.boxShadow = colorGreen; 
    fifthLightElement.style.boxShadow = colorLightblue;
    sixthLightElement.style.boxShadow = colorBlue;
    seventhLightElement.style.boxShadow= colorPurple;
  }, input2);
}
