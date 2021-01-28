import React, { useContext } from "react";
import { Context } from "./Context";
import Board from "./Board";
import "./styles.css";

export default function App() {
  const [{ rows, cols }] = useContext(Context);
  const widthPercent = 90;

  // Set css varibles for screen sizing
  document.documentElement.style.setProperty(
    "--wide",
    `min(calc((${widthPercent}vh - 44px) / ${rows}), calc(${widthPercent}vw / ${cols}))`
  );
  document.documentElement.style.setProperty(
    "--repeat",
    `repeat(${cols}, 1fr)`
  );

  return (
    <div className="App">{rows !== 0 && <Board rows={rows} cols={cols} />}</div>
  );
}
