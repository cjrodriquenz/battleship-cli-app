function generateBoard(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({ type: "empty", hit: false }))
  );
}

function placeShips(board, ships) {
  ships.forEach((ship) => {
    let placed = false;
    while (!placed) {
      const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
      const row = Math.floor(Math.random() * board.length);
      const col = Math.floor(Math.random() * board[0].length);

      if (isValidPlacement(board, row, col, ship.size, direction)) {
        for (let i = 0; i < ship.size; i++) {
          if (direction === "horizontal") {
            board[row][col + i] = { type: ship.type, hit: false };
          } else {
            board[row + i][col] = { type: ship.type, hit: false };
          }
        }
        placed = true;
      }
    }
  });
}

function isValidPlacement(board, row, col, size, direction) {
  if (direction === "horizontal" && col + size > board[0].length) return false;
  if (direction === "vertical" && row + size > board.length) return false;

  for (let i = 0; i < size; i++) {
    if (direction === "horizontal" && board[row][col + i].type !== "empty")
      return false;
    if (direction === "vertical" && board[row + i][col].type !== "empty")
      return false;
  }

  return true;
}

module.exports = { generateBoard, placeShips };
