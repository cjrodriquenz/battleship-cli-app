const readline = require("readline-sync");
const { generateBoard, placeShips } = require("./board");
const { printBoard } = require("./helpers");
const { SHIP_TYPES, BOARD_SIZES } = require("./constants");

function main() {
  console.log("Welcome to Battleship");
  const size = parseInt(
    readline.question("Choose a board size (4, 5, or 6): ")
  );
  const board = generateBoard(size);

  const ships = [
    { type: "large", size: 3 },
    { type: "small", size: 2 },
  ];
  placeShips(board, ships);

  let gameOver = false;
  while (!gameOver) {
    console.clear();
    printBoard(board, false);

    const guess = readline.question("Make a guess (e.g., A1): ").toUpperCase();
    const row = guess.charCodeAt(0) - 65;
    const col = parseInt(guess[1], 10) - 1;

    if (
      isNaN(row) ||
      isNaN(col) ||
      row < 0 ||
      row >= size ||
      col < 0 ||
      col >= size
    ) {
      console.log("Invalid input. Try again.");
      continue;
    }

    if (board[row][col].hit) {
      console.log("You already guessed that spot!");
      continue;
    }

    board[row][col].hit = true;
    if (board[row][col].type !== "empty") {
      console.log("Hit!");
    } else {
      console.log("Miss!");
    }

    gameOver = checkGameOver(board);
  }

  console.log("You sank all the ships!");
  console.log(`
    ========
    __   _______ _   _   _    _ _____ _   _
    \ \ / /  _  | | | | | |  | |_   _| \ | |
     \ V /| | | | | | | | |  | | | | |  \| |
      \ / | | | | | | | | |/\| | | | | . ' |
      | | \ \_/ / |_| | \  /\  /_| |_| |\  |
      \_/  \___/ \___/   \/  \/ \___/\_| \_/
    ========
  `);
}

function checkGameOver(board) {
  return board.flat().every((cell) => cell.type === "empty" || cell.hit);
}

main();
