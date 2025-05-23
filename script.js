// when we click on a square, it's an x or o
// X if it was player 1, and O if it was player 2
// update the h1 to say whose turn it is

// determine when the game ends
// when you click a square, check to see the game ended (win or draw)
// update the text when the game ends
// fix it where you can keep clicking the squares after a win or draw

// restart the game
//when you click the game button reset the board

const title = document.querySelector('.board__title');
const allSquares = document.querySelectorAll('.board__square');

let currentPlayer = 'X';
let gameOver = false;
let board = new Array(9);

allSquares.forEach((square, i) => {
  square.addEventListener('click', () => {
    if(square.innerHTML || gameOver) {
      //makes squares unclickable if already clicked or if game is over
      return;
    }

    board[i] = currentPlayer;
    square.innerHTML = currentPlayer;

    const win = checkWin()
    if(win) {
      title.innerHTML = `${currentPlayer} Won The Game!`;
      return (gameOver = true);
    }

    const draw = checkDraw()
    if(draw) {
      title.innerHTML = `It's a Draw!`
      return (gameOver = true)
    }

    switchPlayer();
    title.innerHTML = `${currentPlayer}'s turn`
  })
})

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  const winningIndicies = [
    //Horizontal Win
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical Win
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonal Win
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningIndicies.length; ++i) {
    const matchingIndicies = winningIndicies[i];
    const symbol1 = board[matchingIndicies[0]];
    const symbol2 = board[matchingIndicies[1]];
    const symbol3 = board[matchingIndicies[2]];
    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }
    if (symbol1 === symbol2 && symbol2 === symbol3) {
      console.log('winner')
      return true;
    }
  }
}

function checkDraw() {
  for (let i = 0; i < board.length; ++i) {
    if (board[i] === undefined) {
      return false;
    }
  }
  return true;
}

function restartGame() {
  gameOver = false;
  board = new Array(9)
  currentPlayer = 'X'
  allSquares.forEach((square) => {
    square.innerHTML = '';
    title.innerHTML = `${currentPlayer}'s turn`
  })
}