function printBoard(board, debug) {
  const displayBoard = board.map((row) =>
    row.map((cell) => {
      if (debug) {
        return cell.type === "empty"
          ? "-"
          : cell.type === "small"
          ? "🟠"
          : "🔵";
      }
      if (cell.hit) {
        return cell.type === "empty"
          ? "❗️"
          : cell.type === "small"
          ? "🟠"
          : "🔵";
      }
      return "-";
    })
  );

  const table = {};
  displayBoard.forEach((row, index) => {
    table[String.fromCharCode(65 + index)] = row;
  });

  console.table(table);
}

module.exports = { printBoard };
