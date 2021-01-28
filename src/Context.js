import React, { useState } from "react";

export const makeGame = (rows, cols, bombs = Math.floor(cols * rows * 0.2)) => {
  return {
    board: makeBoard(rows, cols, bombs),
    gameStarted: false,
    uncovered: 0,
    squares: rows * cols,
    rows,
    cols,
    bombs,
    gameover: false,
    win: false
  };
};

const makeBoard = (rows, cols, bombs = Math.floor(cols * rows * 0.2)) => {
  let x,
    y,
    board = [];
  // Init board to all null
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i][j] = { flipped: " ", display: " " };
    }
  }
  // randomly place the bombs
  for (let i = 0; i < bombs; i++) {
    do {
      x = Math.floor(Math.random() * rows);
      y = Math.floor(Math.random() * cols);
    } while (board[x][y].display === "💣");
    board[x][y].display = "💣";
  }
  // calculate and store the number of bombs surrounding a non-bomb square
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j].display === "💣") {
        if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1].display !== "💣")
          board[i - 1][j - 1].display++;
        if (i - 1 >= 0 && board[i - 1][j].display !== "💣")
          board[i - 1][j].display++;
        if (i - 1 >= 0 && j + 1 < cols && board[i - 1][j + 1].display !== "💣")
          board[i - 1][j + 1].display++;
        if (j - 1 >= 0 && board[i][j - 1].display !== "💣")
          board[i][j - 1].display++;
        if (j + 1 < cols && board[i][j + 1].display !== "💣")
          board[i][j + 1].display++;
        if (i + 1 < rows && j - 1 >= 0 && board[i + 1][j - 1].display !== "💣")
          board[i + 1][j - 1].display++;
        if (i + 1 < rows && board[i + 1][j].display !== "💣")
          board[i + 1][j].display++;
        if (
          i + 1 < rows &&
          j + 1 < cols &&
          board[i + 1][j + 1].display !== "💣"
        )
          board[i + 1][j + 1].display++;
      }
    }
  }
  return board;
};

// check and flip adjacent blocks over (recursive)
export const zeroFlip = (row, col, state) => {
  var rows = state.rows;
  var cols = state.cols;

  if (col > 0 && state.board[row][col - 1].flipped === " ") {
    state.board[row][col - 1].flipped = "Y";
    state.uncovered++;
    if (state.board[row][col - 1].display === " ")
      state.uncovered += zeroFlip(row, col - 1, state);
  }
  if (col < cols - 1 && state.board[row][col + 1].flipped === " ") {
    state.board[row][col + 1].flipped = "Y";
    state.uncovered++;
    if (state.board[row][col + 1].display === " ")
      state.uncovered += zeroFlip(row, col + 1, state);
  }
  if (row > 0 && state.board[row - 1][col].flipped === " ") {
    state.board[row - 1][col].flipped = "Y";
    state.uncovered++;
    if (state.board[row - 1][col].display === " ")
      state.uncovered += zeroFlip(row - 1, col, state);
  }
  if (row < rows - 1 && state.board[row + 1][col].flipped === " ") {
    state.board[row + 1][col].flipped = "Y";
    state.uncovered++;
    if (state.board[row + 1][col].display === " ")
      state.uncovered += zeroFlip(row + 1, col, state);
  }
  if (col > 0 && row > 0 && state.board[row - 1][col - 1].flipped === " ") {
    state.board[row - 1][col - 1].flipped = "Y";
    state.uncovered++;
    if (state.board[row - 1][col - 1].display === " ")
      state.uncovered += zeroFlip(row - 1, col - 1, state);
  }
  if (
    col < cols - 1 &&
    row > 0 &&
    state.board[row - 1][col + 1].flipped === " "
  ) {
    state.board[row - 1][col + 1].flipped = "Y";
    state.uncovered++;
    if (state.board[row - 1][col + 1].display === " ")
      state.uncovered += zeroFlip(row - 1, col + 1, state);
  }
  if (
    col > 0 &&
    row < rows - 1 &&
    state.board[row + 1][col - 1].flipped === " "
  ) {
    state.board[row + 1][col - 1].flipped = "Y";
    state.uncovered++;
    if (state.board[row + 1][col - 1].display === " ")
      state.uncovered += zeroFlip(row + 1, col - 1, state);
  }
  if (
    col < cols - 1 &&
    row < rows - 1 &&
    state.board[row + 1][col + 1].flipped === " "
  ) {
    state.board[row + 1][col + 1].flipped = "Y";
    state.uncovered++;
    if (state.board[row + 1][col + 1].display === " ")
      state.uncovered += zeroFlip(row + 1, col + 1, state);
  }
  return { ...state };
};

export const Context = React.createContext();
export const DataProvider = ({ children }) => {
  const data = useState(makeGame(10, 12));

  return (
    <Context.Provider value={data}>
      <div className="provider">{children}</div>
    </Context.Provider>
  );
};
