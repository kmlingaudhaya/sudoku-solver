document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("sudoku-grid");

  // Create the grid
  for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.placeholder = ".";
    grid.appendChild(input);
  }
});

function solveSudoku() {
  const grid = document.getElementById("sudoku-grid");
  const cells = grid.querySelectorAll("input");
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Get the input values
  cells.forEach((cell, index) => {
    const value = parseInt(cell.value);
    const row = Math.floor(index / 9);
    const col = index % 9;
    if (!isNaN(value) && value >= 1 && value <= 9) {
      board[row][col] = value;
      initialBoard[row][col] = value;
    }
  });

  const message = document.getElementById("message");
  if (solve(board)) {
    // Update the grid with the solution
    cells.forEach((cell, index) => {
      const row = Math.floor(index / 9);
      const col = index % 9;
      cell.value = board[row][col];
      if (initialBoard[row][col] === 0) {
        cell.style.backgroundColor = "#e0ffe0"; // Highlight cells filled by the solver
      }
    });
    message.textContent = "Sudoku solved!";
    message.style.color = "green";
  } else {
    message.textContent = "No solution exists for the given Sudoku.";
    message.style.color = "red";
  }
}

function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (
      board[row][x] === num ||
      board[x][col] === num ||
      board[Math.floor(row / 3) * 3 + Math.floor(x / 3)][
        Math.floor(col / 3) * 3 + (x % 3)
      ] === num
    ) {
      return false;
    }
  }
  return true;
}

function solve(board) {
  let emptySpot = findEmpty(board);
  if (!emptySpot) return true; // No more empty spots, puzzle is solved
  const [row, col] = emptySpot;

  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (solve(board)) {
        return true;
      }
      board[row][col] = 0;
    }
  }

  return false; // Trigger backtracking
}

function findEmpty(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}
