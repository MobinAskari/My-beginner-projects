const txtArea = document.getElementById('js-text-area');
const alt = document.getElementById('alt');
const shift = document.getElementById('shift');
const meta = document.getElementById('meta');
const control = document.getElementById('control');


window.addEventListener('keydown', (e) => {

  if (e.key === 'Alt') {
    alt.innerText = 'alt key:' + true;
  } else {
    alt.innerText = 'alt key:' + false;
  }

  if (e.key === 'Shift') {
    shift.innerText = 'shift key:' + true;
  } else {
    shift.innerText = 'shift key:' + false;
  }

  if (e.key === 'Meta') {
    meta.innerText = 'meta key:' + true;
  } else {
    meta.innerText = 'meta key:' + false;
  }

  if (e.key === 'Control') {
    control.innerText = 'control key:' + true;
  } else {
    control.innerText = 'control key:' + false;
  }

  const txtBreak = document.createElement('br');
  txtArea.value += `
  keyName: ${e.key} - keyValue: ${e.code} - keyCode: ${e.keyCode}
  `;



});