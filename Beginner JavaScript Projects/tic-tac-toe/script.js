const oMoveElement = document.getElementById('o'); 
const xMoveElement = document.getElementById('x');
const currentMoveElement = document.getElementById('current-move');

// Player move elements
const row1Element = document.getElementById('row1');
const row2Element = document.getElementById('row2');
const row3Element = document.getElementById('row3');

const a1Element = document.getElementById('a1');
const a2Element = document.getElementById('a2');
const a3Element = document.getElementById('a3');
const b1Element = document.getElementById('b1');
const b2Element = document.getElementById('b2');
const b3Element = document.getElementById('b3');
const c1Element = document.getElementById('c1');
const c2Element = document.getElementById('c2');
const c3Element = document.getElementById('c3');
// End of move elements


// moves variabels
a1;
a2;
a3;
b1;
b2;
b3;
c1;
c2;
c3;
// end of moves variables

// moves placed
let a1placed;
let a2placed;
let a3placed;
let b1placed;
let b2placed;
let b3placed;
let c1placed;
let c2placed;
let c3placed;
// end of moves placed;

const movesArray = 
[
  [a1, a2, a3],
  [b1, b2, b3],
  [c1, c2, c3]
];


let playerMove;
let playerMoveVisual;

oMoveElement.addEventListener('click', () => {
  playerMove = 'circle';

  playerMoveVisual = `
  <span class="material-symbols-sharp" id="circle">
  circle
  </span> `;

  currentMoveElement.innerHTML = 'Current move: ' + playerMoveVisual;

});

xMoveElement.addEventListener('click', () => {
  playerMove = 'cross';

  playerMoveVisual = 
  `<span class="material-symbols-sharp" id="close">
  close
  </span>`;

  currentMoveElement.innerHTML = 'Current move: ' + playerMoveVisual;
});


a1Element.addEventListener('click', () => {
  if (a1placed === true) {
    return;
  }
  if (playerMove) {
    a1 = playerMove;
    a1Element.innerHTML = playerMoveVisual;
    movesArray[0][0] = playerMove;
    checkResult();
    changeMove();
    a1placed = true;
  } else {
    currentMoveElement.innerText = 'Please pick a move!';
  }
});

a2Element.addEventListener('click', () => {
  if (a2placed === true) {
    return;
  }
  if (playerMove) {
    a2 = playerMove;
    a2Element.innerHTML = playerMoveVisual;
    movesArray[0][1] = playerMove;
    checkResult();
    changeMove();
    a2placed = true;
  } else {
    currentMoveElement.innerText = 'Please pick a move!';
  }
});

a3Element.addEventListener('click', () => {
  if (a3placed === true) {
    return;
  }
  if (playerMove) {
    a3 = playerMove;
    a3Element.innerHTML = playerMoveVisual;
    movesArray[0][2] = playerMove;
    checkResult();
    changeMove();
    a3placed = true;
  } else {
    currentMoveElement.innerText = 'Please pick a move!';
  }
});

b1Element.addEventListener('click', () => {
  if (b1placed === true) {
    return;
  }
  if (playerMove) {
    b1 = playerMove;
    b1Element.innerHTML = playerMoveVisual;
    movesArray[1][0] = playerMove;
    checkResult();
    changeMove();
    b1placed = true;
  } else {
    currentMoveElement.innerText = 'Please pick a move!';
  }
});

b2Element.addEventListener('click', () => {
  if (b2placed === true) {
    return;
  }
  if (playerMove) {
    b2 = playerMove;
    b2Element.innerHTML = playerMoveVisual;
    movesArray[1][1] = playerMove;
    checkResult();
    changeMove();
    b2placed = true;
  } else {
    currentMoveElement.innerText = 'Please pick a move!';
  }
});

b3Element.addEventListener('click', () => {
  if (b3placed === true) {
    return;
  }
  if (playerMove) {
    b3 = playerMove;
    b3Element.innerHTML = playerMoveVisual;
    movesArray[1][2] = playerMove;
    checkResult();
    changeMove();
    b3placed = true;
  } else {
    currentMoveElement.innerText = 'Please pick a move!';
  }
});

c1Element.addEventListener('click', () => {
  if (c1placed === true) {
    return;
  }
  if (playerMove) {
    c1 = playerMove;
    c1Element.innerHTML = playerMoveVisual;
    movesArray[2][0] = playerMove;
    checkResult();
    changeMove();
    c1placed = true;
  } else {
    currentMoveElement.innerText = 'Please pick a move!';
  }
});

c2Element.addEventListener('click', () => {
  if (c2placed === true) {
    return;
  }
  if (playerMove) {
    c2 = playerMove;
    c2Element.innerHTML = playerMoveVisual;
    movesArray[2][1] = playerMove;
    checkResult();
    changeMove();
    c2placed = true;
  } else {
    currentMoveElement.innerText = 'Please pick a move!';
  }
});

c3Element.addEventListener('click', () => {
  if (c3placed === true) {
    return;
  }
  if (playerMove) {
    c3 = playerMove;
    c3Element.innerHTML = playerMoveVisual;
    movesArray[2][2] = playerMove;
    checkResult();
    changeMove();
    c3placed = true;
  } else {
    currentMoveElement.innerText = 'Please pick a move!';
  }
});


function checkResult() {
  const a1 = movesArray[0][0];
  const a2 = movesArray[0][1];
  const a3 = movesArray[0][2];
  const b1 = movesArray[1][0];
  const b2 = movesArray[1][1];
  const b3 = movesArray[1][2];
  const c1 = movesArray[2][0];
  const c2 = movesArray[2][1];
  const c3 = movesArray[2][2];

  const oMove = 'circle';
  const xMove = 'cross';


  { // rows = circle 
    if (a1 === oMove && a2 === oMove && a3 === oMove) {
      alert(`${oMove} wins!`);
      location.reload();
      location.reload();
    }
    
    if (b1 === oMove && b2 === oMove && b3 === oMove) {
      alert(`${oMove} wins!`);
      location.reload();
    }

    if (c1 === oMove && c2 === oMove && c3 === oMove) {
      alert(`${oMove} wins!`);
      location.reload();
    }
  }

  { // rows = cross
    if (a1 === xMove && a2 === xMove && a3 === xMove) {
      alert(`${xMove} wins!`);
      location.reload();
    }
    
    if (b1 === xMove && b2 === xMove && b3 === xMove) {
      alert(`${xMove} wins!`);
      location.reload();
    }

    if (c1 === xMove && c2 === xMove && c3 === xMove) {
      alert(`${xMove} wins!`);
      location.reload();
    }
  }

  { // columns = circle
  if (a1 === oMove && b1 === oMove && c1 === oMove) {
    alert(`${oMove} wins!`);
    location.reload();
  }
  
  if (a2 === oMove && b2 === oMove && c2 === oMove) {
    alert(`${oMove} wins!`);
    location.reload();
  }

  if (a3 === oMove && b3 === oMove && c3 === oMove) {
    alert(`${oMove} wins!`);
    location.reload();
  }
  }

  { // columns = cross
    if (a1 === xMove && b1 === xMove && c1 === xMove) {
      alert(`${xMove} wins!`);
      location.reload();
    }
    
    if (a2 === xMove && b2 === xMove && c2 === xMove) {
      alert(`${xMove} wins!`);
      location.reload();
    }
  
    if (a3 === xMove && b3 === xMove && c3 === xMove) {
      alert(`${xMove} wins!`);
      location.reload();
    }
  }

  { // diagnol = circle 
    if (a1 === oMove && b2 === oMove && c3 === oMove) {
      alert(`${oMove} wins!`);
      location.reload();
    }
    if (a3 === oMove && b2 === oMove && c1 === oMove) {
      alert(`${oMove} wins!`);
      location.reload();
    }
  }

  { // diagnol = cross 
    if (a1 === xMove && b2 === xMove && c3 === xMove) {
      alert(`${xMove} wins!`);
      location.reload();
    }
    if (a3 === xMove && b2 === xMove && c1 === xMove) {
      alert(`${xMove} wins!`);
      location.reload();
    }
  }

   
}


function changeMove() {
  if (playerMove === 'circle') {
    playerMove = 'cross';
    playerMoveVisual = `
    <span class="material-symbols-sharp" id="close">
    close
    </span> `;

    currentMoveElement.innerHTML = 'Current move: ' + playerMoveVisual;

    oMoveElement.disabled = true;

  } else if (playerMove === 'cross') {
    playerMove = 'circle';
    playerMoveVisual = `
    <span class="material-symbols-sharp" id="circle">
    circle
    </span> `;
  
    currentMoveElement.innerHTML = 'Current move: ' + playerMoveVisual;

    xMoveElement.disabled = true;
  }
}

// refresh if result is tie

setInterval (() => {
    if (a1placed === true && a2placed === true && a3placed === true && b1placed === true && b2placed === true && b3placed === true && c1placed === true && c2placed === true && c3placed === true) {
      alert('Tied!');
      a1placed = false;
      location.reload();
    }
}, 1000);