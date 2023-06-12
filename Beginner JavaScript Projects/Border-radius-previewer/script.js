const element = document.getElementById('shape');
const bottomLeft = document.getElementById('bottom-left');
const bottomRight = document.getElementById('bottom-right');
const topLeft = document.getElementById('top-left');
const topRight = document.getElementById('top-right');

const previewTopLeft =document.getElementById('preview-topleft');
const previewTopRight =document.getElementById('preview-topright');
const previewBottomLeft =document.getElementById('preview-bottomleft');
const previewBottomRight =document.getElementById('preview-bottomright');

const copyButton = document.getElementById('copy');

document.getElementById('bottom-left').addEventListener('keyup', () => {
  element.style.borderBottomLeftRadius = bottomLeft.value;
  previewBottomLeft.innerText = bottomLeft.value;
  previewBottomLeft.style.color = 'green';
});

document.getElementById('bottom-right').addEventListener('keyup', () => {
  element.style.borderBottomRightRadius = bottomRight.value;
  previewBottomRight.innerText = bottomRight.value;
  previewBottomRight.style.color = 'red';
});

document.getElementById('top-left').addEventListener('keyup', () => {
  element.style.borderTopLeftRadius = topLeft.value;
  previewTopLeft.innerText = topLeft.value;
  previewTopLeft.style.color = 'cornflowerblue';
});

document.getElementById('top-right').addEventListener('keyup', () => {
  element.style.borderTopRightRadius = topRight.value;
  previewTopRight.innerText = topRight.value;
  previewTopRight.style.color = 'chocolate';
});

copyButton.addEventListener('click', () => {
  copyText(
    bottomLeft.value,
    bottomRight.value,
    topLeft.value,
    topRight.value
  );
  
  copyButton.innerText = 'Styles copied!';

  setTimeout(() => {
    copyButton.innerText = 'Copy the styles';
  }, 2000);
});

function copyText(
  bottomLeft,
  bottomRight,
  topLeft,
  topRight
) {
  navigator.clipboard.writeText(`Border-radius: ${topLeft} ${topRight} ${bottomRight} ${bottomLeft};`);
}

/* execCommand solution which isn't recommened 
function copyText(
  bottomLeft,
  bottomRight,
  topLeft,
  topRight
) {

  let textArea = document.createElement('textarea');

  textArea.innerText = `Border-radius: ${topLeft} ${topRight} ${bottomRight} ${bottomLeft};`;

  document.body.appendChild(textArea);

  textArea.select();

  document.execCommand('copy');

  document.body.removeChild(textArea);
}
*/