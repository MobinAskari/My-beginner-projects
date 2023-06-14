let firstPart;

let secondPart;

let thirdPart;

let intervalId;

const hexValue1 = document.getElementById('hex1'); 
let intervalTime = document.getElementById('timer');
const submitButton = document.getElementById('submit');

let hex1;
let hex2;
let hex3;
let hex4;
let hex5;
let hex6;

submitButton.addEventListener('click', () => {
  /*
  let hexConditional = hexValue1.value;
  if (hexConditional === '!' || hexConditional === '@' ||hexConditional === '#' ||hexConditional === '$' ||hexConditional === '%' ||hexConditional === '^' ||hexConditional === '&' ||hexConditional === '*' ||hexConditional === '(' ||hexConditional === ')' ||hexConditional === '-' ||hexConditional === '+' ||hexConditional === '.' ||hexConditional === '/') {
    return;
  } else {
  */
  if (hexValue1.value === '') {
    alert('Please enter a hex value');
    return;
  }
  if (intervalTime.value) {
    hexToRGB(intervalTime.value);
  } else {
    hexToRGB();
  }
  

});

function hexToRGB(intervalTimeValue = '250') {
  const hexArray = [];

  if (hexValue1.value.length < 6) {
    alert('Enter a full 6 digit/string hex value');
    return;
  }
  hexArray.push(
    hex = hexValue1.value.substring(0, 1),
    hex = hexValue1.value.substring(1, 2),
    hex = hexValue1.value.substring(2, 3),
    hex = hexValue1.value.substring(3, 4),
    hex = hexValue1.value.substring(4, 5),
    hex = hexValue1.value.substring(5, 6)  
  );

  console.log(hexArray);
  //console.log(hexArray);

  hexArray.forEach((value, index) => {
   //console.log(value, index);
    for (let i = 0; i <= index; i++) {
      if (value[i] == 'f') {
        hexArray[index] = 15;
        // console.log(hexArray[i], index);
      }
      if (value[i] == 'e') {
        hexArray[index] = 14;
        // console.log(hexArray[i], index);
      }
      if (value[i] == 'd') {
        hexArray[index] = 13;
        // console.log(hexArray[i], index);
      }
      if (value[i] == 'c') {
        hexArray[index] = 12;
        // console.log(hexArray[i], index);
      }
      if (value[i] == 'b') {
        hexArray[index] = 11;
        // console.log(hexArray[i], index);
      }
      if (value[i] == 'a') {
        hexArray[index] = 10;
        // console.log(hexArray[i], index);
      } 
    }
    
  });

  /*
  firstPart = (hexArray[0] * 16 + hexArray[1]);
  secondPart = (hexArray[2] * 16 + hexArray[3]);
  thirdPart = (hexArray[4] * 16 + hexArray[5]);
  */
  firstPart = (parseFloat(hexArray[0]) * 16 + parseFloat(hexArray[1]));
  secondPart =(parseFloat(hexArray[2]) * 16 + parseFloat(hexArray[3]));
  thirdPart = (parseFloat(hexArray[4]) * 16 + parseFloat(hexArray[5]));  
  //console.log(firstPart, secondPart, thirdPart);
  
  changeColor(firstPart, secondPart, thirdPart, intervalTimeValue);
}

function changeColor(firstPart, secondPart, thirdPart, intervalTimeValue) {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    if (firstPart < 255) { 
      firstPart++;
    } 
    
    if (secondPart < 255) { 
      secondPart++;
    } 
    
    if (thirdPart < 255) { 
      thirdPart++;
    } 
  
    let color = `RGB(${firstPart},${secondPart},${thirdPart})`;
    // 'RGB('+firstPart+','+secondPart+','+thirdPart+')';
    
    // console.log(color);
    document.getElementById('box').style.backgroundColor = color;

    if (firstPart > 254 && secondPart > 254 & thirdPart > 254) {
      clearInterval(intervalId);
    }
    
  }, intervalTimeValue);
}


/*
for (let i = 0; i < 256; i++) {
  

  console.log(firstPart, secondPart, thirdPart);
  
}
*/



