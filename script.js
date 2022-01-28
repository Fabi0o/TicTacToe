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
  };
})();
//creates players
const player = (number, marker) => {
  return { number, marker };
};

const playerOne = player("playerOne", "X");
const playerTwo = player("playerTwo", "O");
