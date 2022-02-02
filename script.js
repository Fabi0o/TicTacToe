//stores state of the gameboard and has function that diplays the board
const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const buttons = document.querySelectorAll(".gridItem");
  const displayBoard = () => {
    buttons.forEach((button) => {
      button.textContent = board[button.dataset.indexNumber];
    });
  };
  return {
    displayBoard,
    board,
  };
})();
//creates players and lets them display their moves on the gameboard
const player = (name, marker) => {
  const displayMove = (target) => {
    gameboard.board[target.dataset.indexNumber] = marker;
    gameboard.displayBoard();
  };
  const winText = `${name} have won!!`;
  return { name, marker, displayMove, winText };
};

const playerOne = player("PlayerOne", "X");
const playerTwo = player("PlayerTwo", "O");
//contains game logic
const gameLogic = (() => {
  const buttons = document.querySelectorAll(".gridItem");
  const instructionXBanner = document.querySelector(".instructionX");
  const instructionOBanner = document.querySelector(".instructionO");
  let markersOnBoard = 0;
  const gameOverBanner = document.querySelector(".gameOver");
  const playAgainLink = document.querySelector(".playAgain");
  //plays the game, contains all the rules
  const gamePlay = function (event) {
    if (!winner()) {
      if (
        (markersOnBoard == 0 || markersOnBoard % 2 == 0) &&
        this.textContent == ""
      ) {
        playerOne.displayMove(this);
        markersOnBoard++;
      } else if (
        markersOnBoard % 2 != 0 &&
        markersOnBoard != 9 &&
        this.textContent == ""
      ) {
        playerTwo.displayMove(this);
        markersOnBoard++;
      }
    }
    if (winner() && winner() != "It's a draw!") {
      gameOverBanner.textContent = winner().winText;
      playAgainLink.textContent = "Play again?";
    } else if (winner()) {
      gameOverBanner.textContent = winner();
      playAgainLink.textContent = "Play again?";
    }
  };
  //adds functionality to buttons and starts the game
  const addGamePlay = function (event) {
    this.removeEventListener("click", addGamePlay);
    instructionXBanner.textContent = `${playerOne.name} = ${playerOne.marker}`;
    instructionOBanner.textContent = `${playerTwo.name} = ${playerTwo.marker}`;
    buttons.forEach((button) => {
      button.addEventListener("click", gamePlay);
    });
  };
  const startGame = () => {
    const startButton = document.querySelector(".start");
    startButton.addEventListener("click", addGamePlay);
  };
  //checks state of the game
  const winner = () => {
    return (
      checkWinner(0, 1, 2) ||
      checkWinner(3, 4, 5) ||
      checkWinner(6, 7, 8) ||
      checkWinner(0, 3, 6) ||
      checkWinner(1, 4, 7) ||
      checkWinner(2, 5, 8) ||
      checkWinner(0, 4, 8) ||
      checkWinner(2, 4, 6) ||
      isDraw()
    );
  };
  const checkWinner = (p1, p2, p3) => {
    let m1 = gameboard.board[p1];
    if (m1 == "") return false;
    let m2 = gameboard.board[p2];
    if (m1 != m2) return false;
    let m3 = gameboard.board[p3];
    if (m1 != m3) return false;
    if (m1 == "X") return playerOne;
    else return playerTwo;
  };
  const isDraw = () => {
    if (markersOnBoard == 9) return "It's a draw!";
  };
  return {
    startGame,
  };
})();
gameLogic.startGame();
