const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = [``, ``, ``, ``, ``, ``, ``, ``, ``];
let currentPlayer = 'X';
let isRunning = false;

inizializeGame();

function inizializeGame() {
  //for each cell clicked we invoke cellClicked function through addeventlistener
  cells.forEach((cell) => cell.addEventListener('click', cellClicked));
  //change player directly in html
  statusText.textContent = `${currentPlayer}'s turn`;
  // set isRunning to true
  isRunning = true;
  //restart the game
  restartBtn.addEventListener('click', restartGame);
}

function cellClicked() {
  //when we click on a cell we create a variable that store the cellindex attribute of the specific cell(this)
  const cellIndex = this.getAttribute('cellIndex');
  // check if the options array in the cellindex position isn't empy or the game is not running, return nothing( do nothing)
  if ((options[cellIndex] != '') | !isRunning) {
    return;
  }
  //otherwise update the cell
  updateCell(this, cellIndex);
  //then checkWInner
  checkWinner();
  console.log(options);
}
function updateCell(cell, index) {
  // updating options placeholder with the index
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  // check if currentPlayer is X set to O, otherwise set to X
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  // update textcontent with the player's name turn
  statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  let roundWon = false;
  // iterate over all of the winCondition within win condition is done
  for (let i = 0; i < winCondition.length; i++) {
    // create a temporaty variable
    const condition = winCondition[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    // check if there are empty space in the cell
    if ((cellA == '') | (cellB == '') | (cellC == '')) {
      continue;
    }
    //check if there is the same currentplayer value in 3 cells consecutive
    if (
      cellA == currentPlayer &&
      cellB == currentPlayer &&
      cellC == currentPlayer
    ) {
      // roundwon e break
      roundWon = true;
      break;
    }
    console.log(cellA, cellB, cellC);
  }
  // check if the round is won then write player that win
  if (roundWon) {
    statusText.textContent = `${currentPlayer} win!`;
    isRunning = false;
  } // check if there aren't empty '' so it's a draw
  else if (!options.includes('')) {
    statusText.textContent = `It's a draw!`;
    isRunning = false;
  } // otherwise invoke changeplayer function
  else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = 'X';
  options = [``, ``, ``, ``, ``, ``, ``, ``, ``];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ''));
  isRunning = true;
}
