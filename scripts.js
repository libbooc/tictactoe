let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restart_btn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
let winnerIndicator2 = getComputedStyle(document.body).getPropertyValue('--red');

const O_TEXT = "O";
const X_TEXT = "X";
let current_player = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = current_player;
    e.target.innerText = current_player;

    e.target.classList.add('no-hover');

    if (playerHasWon() !== false) {
      playerText.textContent = ` ${current_player} is the winner!`;
      
      
      let winning_blocks = playerHasWon();
      
      setTimeout(() => {
        alert(playerText.textContent)}, 100)

      winning_blocks.forEach(box => boxes[box].classList.add('winner'));
      winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
      winning_blocks.map( box => boxes[box].style.color=winnerIndicator2)
      

      boxes.forEach(box => box.removeEventListener('click', boxClicked));

      return;
    }


    if (isDraw()) {
      playerText.textContent = "It's a draw!";
      setTimeout(() => {
        alert(playerText.textContent)}, 100)
      return;
    }

    current_player = current_player == X_TEXT ? O_TEXT : X_TEXT;
    playerText.textContent = `Player ${current_player}'s Turn`;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
      return [a, b, c];
    }
  }
  return false;
}

function isDraw() {
  return spaces.every(space => space !== null);
}

restartBtn.addEventListener('click', restart);

function restart() {
  spaces.fill(null);

  boxes.forEach(box => {
    box.innerText = '';
    box.classList.remove('winner');
    box.style.backgroundColor=''
    box.style.color=''

    box.classList.remove('no-hover');
  });

  

  playerText.textContent = 'Player X\'s Turn';

  boxes.forEach(box => box.addEventListener('click', boxClicked));

  current_player = X_TEXT;
}

startGame();
