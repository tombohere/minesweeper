import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Context } from "./Context";

const Square = ({ row, col }) => {
  const [data, setData] = useContext(Context);
  const { flipped, display } = data.board[row][col];

  const handleRightClick = (e) => {
    e.preventDefault();
    if (data.board[row][col].flipped === "Y") return;
    let temp = data.board;
    if (temp[row][col].flipped === " ") {
      temp[row][col].flipped = "⚑";
    } else {
      temp[row][col].flipped = " ";
    }
    setData({ ...data, board: temp });
  };

  const gameLeftClick = () => {
    let n, // current array item
      s = [{ r: row, c: col }], // row and column array
      temp = data.board,
      count = 0;
    temp[row][col].flipped = "Y";

    while (s.length) {
      n = s.shift();
      count++;
      if (temp[n.r][n.c].display === " ") {
        if (n.r > 0 && n.c > 0 && temp[n.r - 1][n.c - 1].flipped === " ") {
          s.push({ r: n.r - 1, c: n.c - 1 });
          temp[n.r - 1][n.c - 1].flipped = "Y";
        }
        if (n.r > 0 && temp[n.r - 1][n.c].flipped === " ") {
          s.push({ r: n.r - 1, c: n.c });
          temp[n.r - 1][n.c].flipped = "Y";
        }
        if (
          n.r > 0 &&
          n.c < data.cols - 1 &&
          temp[n.r - 1][n.c + 1].flipped === " "
        ) {
          s.push({ r: n.r - 1, c: n.c + 1 });
          temp[n.r - 1][n.c + 1].flipped = "Y";
        }
        if (n.c > 0 && temp[n.r][n.c - 1].flipped === " ") {
          s.push({ r: n.r, c: n.c - 1 });
          temp[n.r][n.c - 1].flipped = "Y";
        }
        if (n.c < data.cols - 1 && temp[n.r][n.c + 1].flipped === " ") {
          s.push({ r: n.r, c: n.c + 1 });
          temp[n.r][n.c + 1].flipped = "Y";
        }
        if (
          n.r < data.rows - 1 &&
          n.c > 0 &&
          temp[n.r + 1][n.c - 1].flipped === " "
        ) {
          s.push({ r: n.r + 1, c: n.c - 1 });
          temp[n.r + 1][n.c - 1].flipped = "Y";
        }
        if (n.r < data.rows - 1 && temp[n.r + 1][n.c].flipped === " ") {
          s.push({ r: n.r + 1, c: n.c });
          temp[n.r + 1][n.c].flipped = "Y";
        }
        if (
          n.r < data.rows - 1 &&
          n.c < data.cols - 1 &&
          temp[n.r + 1][n.c + 1].flipped === " "
        ) {
          s.push({ r: n.r + 1, c: n.c + 1 });
          temp[n.r + 1][n.c + 1].flipped = "Y";
        }
      }
    }

    setData({
      ...data,
      gameStarted: true,
      uncovered: data.uncovered + count,
      gameover: display === "💣",
      win:
        data.squares - data.bombs === data.uncovered + count &&
        display !== "💣",
      board: temp
    });
  };

  return (
    <motion.div
      className={flipped === "Y" ? ` color_${display}` : "game-square"}
      animate={{ scale: 1, x: 0, y: 0 }}
      transition={{ duration: 1.0, delay: 0.0 }}
      initial={{
        scale: 0.1,
        x: Math.random() * 100 - 50 + "vw",
        y: Math.random() * 100 - 50 + "vh"
      }}
      onClick={flipped === " " && !data.gameover ? gameLeftClick : () => {}}
      onContextMenu={
        !data.gameover ? (e) => handleRightClick(e) : (e) => e.preventDefault()
      }
    >
      {flipped === "Y" ? display : flipped}
    </motion.div>
  );
};

export default Square;
