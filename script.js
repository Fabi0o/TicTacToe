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
  return { name, marker, displayMove };
};

const playerOne = player("playerOne", "X");
const playerTwo = player("playerTwo", "O");

const gameLogic = (() => {
  const buttons = document.querySelectorAll(".gridItem");
  let markersOnBoard = 0;
  const gamePlay = function (event) {
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
  };
  const addGamePlay = function (event) {
    this.removeEventListener("click", addGamePlay);
    buttons.forEach((button) => {
      button.addEventListener("click", gamePlay);
    });
  };
  const startGame = () => {
    const startButton = document.querySelector(".start");
    startButton.addEventListener("click", addGamePlay);
  };
  return {
    startGame,
  };
})();
gameLogic.startGame();
