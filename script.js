//stores state of the gameboard and has function that diplays the board
const gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const displayBoard = () => {
    const buttons = document.querySelectorAll(".gridItem");
    buttons.forEach((button) => {
      button.textContent = board[button.dataset.indexNumber];
    });
  };
  return {
    displayBoard,
    board,
  };
})();
//creates players
const player = (number, marker) => {
  const buttons = document.querySelectorAll(".gridItem");

  const displayMove = function (event) {
    gameboard.board[this.dataset.indexNumber] = marker;
    gameboard.displayBoard();
    buttons.forEach((button) => {
      button.removeEventListener("click", displayMove);
    });
  };
  const playerMove = () => {
    buttons.forEach((button) => {
      if (button.textContent == "") {
        button.addEventListener("click", displayMove);
      }
    });
  };
  return { number, marker, playerMove };
};

const playerOne = player("playerOne", "X");
const playerTwo = player("playerTwo", "O");
playerOne.playerMove();
