import React, { useContext, useState, useEffect } from "react";
import _ from "lodash";
import { Context } from "./Context";
import Menu from "./Menu";
import GameMessage from "./GameMessage";
import Square from "./Square";

const Board = ({ rows, cols }) => {
  const [{ gameStarted, gameover, win, bombs }] = useContext(Context);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (gameStarted && !gameover && !win) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameover, win, timer]);

  return (
    <div className="outer-board">
      <div className="status-top">
        <div className="status-top-left">
          <Menu height={rows} width={cols} bombs={bombs} />
        </div>
        <div className="status-top-right">{timer}</div>
      </div>
      <div className="game-board">
        {_.times(rows, (i) =>
          _.times(cols, (j) => <Square key={i * rows + j} row={i} col={j} />)
        )}
        {gameover && (
          <GameMessage>
            GAME
            <br />
            OVER
          </GameMessage>
        )}
        {win && (
          <GameMessage>
            YOU
            <br />
            WIN
          </GameMessage>
        )}
      </div>
    </div>
  );
};

export default Board;
