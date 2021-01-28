import React from "react";

const GameMessage = ({ children }) => {
  return (
    <div className="gameover">
      <div>{children}</div>
    </div>
  );
};

export default GameMessage;
