// Function to initialize the Sudoku grid with the default puzzle
function initializeSudoku() {
  var sudokuGrid = document.getElementById("sudoku-grid");
  sudokuGrid.innerHTML = ""; // Clear any existing content

  // Default Sudoku puzzle (replace with your own puzzle)
  var defaultSudoku = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];

  // Loop through the default puzzle and create input fields
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var inputValue = defaultSudoku[i][j];
      var input = document.createElement("input");
      input.type = "text";
      input.value = inputValue !== 0 ? inputValue : "";
      input.dataset.row = i;
      input.dataset.col = j;
      input.addEventListener("input", validateInput);
      sudokuGrid.appendChild(input);
    }
  }
}

// Function to solve the Sudoku puzzle
function solveSudoku() {
  var sudokuGrid = document.getElementById("sudoku-grid");
  var cells = sudokuGrid.querySelectorAll("input");
  var board = Array.from({ length: 9 }, () => Array(9).fill(0));
  var initialBoard = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Get the input values from the grid
  cells.forEach((cell, index) => {
    var value = parseInt(cell.value);
    var row = Math.floor(index / 9);
    var col = index % 9;
    if (!isNaN(value) && value >= 1 && value <= 9) {
      board[row][col] = value;
      initialBoard[row][col] = value;
    }
  });

  var message = document.getElementById("message");
  if (solveHelper(board)) {
    // Update the grid with the solution
    cells.forEach((cell, index) => {
      var row = Math.floor(index / 9);
      var col = index % 9;
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

// Function to validate input in Sudoku grid
function validateInput(event) {
  var input = event.target;
  var value = input.value;
  if (value !== "") {
    if (isNaN(value) || value < 1 || value > 9 || value.length !== 1) {
      input.value = "";
    }
  }
}

// Function to reset the Sudoku grid
function resetSudoku() {
  var sudokuGrid = document.getElementById("sudoku-grid");
  sudokuGrid.innerHTML = ""; // Clear any existing content
  initializeSudoku(); // Re-initialize the grid with the default puzzle
  document.getElementById("message").textContent = "";
}

// Helper function for backtracking Sudoku solver algorithm
function solveHelper(board) {
  var emptySpot = findEmptySpot(board);
  if (!emptySpot) return true; // No more empty spots, puzzle is solved
  var [row, col] = emptySpot;

  for (var num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;
      if (solveHelper(board)) {
        return true;
      }
      board[row][col] = 0;
    }
  }

  return false; // Trigger backtracking
}

// Function to check if a number is safe to place in a specific cell
function isSafe(board, row, col, num) {
  for (var x = 0; x < 9; x++) {
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

// Function to find an empty spot (cell) in the Sudoku grid
function findEmptySpot(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}

// Initialize Sudoku grid on page load
initializeSudoku();
