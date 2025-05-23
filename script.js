// when we click on a square, it's an x or o
// X if it was player 1, and O if it was player 2
// update the h1 to say whose turn it is

// determine when the game ends
// when you click a square, check to see the game ended (win or draw)
// update the text when the game ends

// restart the game
//when you click the game button reset the board

const title = document.querySelector(".board__title");
const allSquares = document.querySelectorAll(".board__square"); //this gets all the html elements that have board__square as a class

let currentPlayer = "X";
let gameOver = false;
let board = new Array(9);

allSquares.forEach((square, i) => {
  //best practices to target all the squares and cleanest
  square.addEventListener("click", () => {
    //event listener has 2 arguments, first is what it's listening for, 2nd is a callback.

    if (square.innerHTML || gameOver) {
      return;
      //this doesn't let you click boxes and change the elements when game is over OR if the square.innerHTML exists (is true) in that box already, by returning straight away
    }

    square.innerHTML = currentPlayer;
    board[i] = currentPlayer; // this is the magic sauce.  It sets the index of the board to current player which is either X or O.
    // we've already affected the dom to do that but we have to affect the board as well.

    const win = checkWin();
    if (win) {
      title.innerHTML = `${currentPlayer} Wins!`;
      gameOver = true; //gameover should be true once you win so you can't keep clicking. which you set with the if statement up above with the return after if Gameover
      return; // so it doesn't execute the rest of the function which sets the title innerhtml again
    }

    const draw = checkDraw();
    if (draw) {
      title.innerHTML = `It's a Draw!`;
      gameOver = true;
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X"; //ternary, is current player x when you click? then set to o.  if not, set it to x.  This is for alternating x and o.
    title.innerHTML = `${currentPlayer}'s Turn`; // should be after ternary
  });
});

function restartGame() {
  gameOver = false;
  board = new Array(9);
  currentPlayer = "X"
  allSquares.forEach((square) => {
    square.innerHTML = "";
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
}

function checkDraw() {
  //if entire board is filled up, and there's no win, then it's a draw
  for (let i = 0; i < board.length; ++i) {
    if (board[i] === undefined) {
      // if there's any empty elements, return false, otherwise, if no empty elements, the return true
      return false;
    }
  }
  return true;
}

function checkWin() {
  //storing all winning combos in an array.  and now that we've defined symbols below, if any symbols match in the pattern that these indicies match, then it's a win
  const winningIndicies = [
    //Horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Diagonal wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningIndicies.length; ++i) {
    //loop over all winning combos
    const matchingIndicies = winningIndicies[i]; // define a variable to make it more clear
    let symbol1 = board[matchingIndicies[0]];
    let symbol2 = board[matchingIndicies[1]];
    let symbol3 = board[matchingIndicies[2]];
    if (!symbol1 || !symbol2 || !symbol3) {
      // this solves the problem below of if any of them is empty, it's not a win and to continue.
      continue;
    }
    if (symbol1 === symbol2 && symbol2 === symbol3) {
      console.log("winner at", matchingIndicies); // problem with this is it will compare even empty boxes and say they're the same becaue they're the same "symbols" so do the if statement above this
      return true;
    }
  }
}

// these are index numbers
// horizontal wins
// 0, 1, 2
// 3, 4, 5
// 6, 7, 8

// vertical wins
// 0, 3, 6
// 1, 4, 7
// 2, 5, 8

// diagonal wins
//0, 4, 8
// 2, 4, 6

//so make a board array
