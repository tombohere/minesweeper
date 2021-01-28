import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Context, makeGame } from "./Context";

const Menu = ({ height, width, bombs }) => {
  const [, setData] = useContext(Context);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [form, setForm] = useState({
    boardHeight: height,
    boardWidth: width,
    boardBombs: Math.ceil((bombs / (height * width)) * 100)
  });

  const menuToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  document.addEventListener("keyup", function (e) {
    if (e.key === "Escape") {
      if (toggleMenu === true) setToggleMenu(!toggleMenu);
    }
  });

  const changeHandler = (e) => {
    e.preventDefault();
    let temp = form;
    temp[e.target.name] = e.target.value;
    setForm({ ...temp });
  };

  const playBoard = () => {
    setData(makeGame(0, 0, 0));
    setToggleMenu(!toggleMenu);
    setTimeout(() => {
      setData(
        makeGame(
          form.boardHeight,
          form.boardWidth,
          (
            form.boardHeight *
            form.boardWidth *
            (form.boardBombs / 100)
          ).toFixed(0)
        )
      );
    }, 1);
  };

  return (
    <div className="Menu">
      <div className="menu-container">
        <div className="hamburger" onClick={menuToggle}>
          {"⚙️"}
        </div>
        <AnimatePresence exitBeforeEnter>
          {toggleMenu && (
            <motion.div
              className="menu-section"
              initial={{ scale: 0, opacity: 0, originX: 0, originY: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, type: "tween" }}
            >
              <div className="menu-title">MINESWEEPER</div>
              <table>
                <thead>
                  <tr>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Board Height&nbsp;</td>
                    <td>
                      {" "}
                      <input
                        name="boardHeight"
                        type="range"
                        min="8"
                        max="20"
                        step="1"
                        value={form.boardHeight}
                        onChange={changeHandler}
                      />
                    </td>
                    <td>&nbsp;{form.boardHeight}</td>
                  </tr>
                  <tr>
                    <td>Board Width</td>
                    <td>
                      {" "}
                      <input
                        name="boardWidth"
                        type="range"
                        min="8"
                        max="20"
                        step="1"
                        value={form.boardWidth}
                        onChange={changeHandler}
                      />
                    </td>
                    <td>&nbsp;{form.boardWidth}</td>
                  </tr>
                  <tr>
                    <td>% of bombs</td>
                    <td>
                      {" "}
                      <input
                        name="boardBombs"
                        type="range"
                        min="10"
                        max="30"
                        step="1"
                        value={form.boardBombs}
                        onChange={changeHandler}
                      />
                    </td>
                    <td>&nbsp;{form.boardBombs}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={playBoard}>CREATE BOARD</button>
              <span
                className="menu-close"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                {"❌"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Menu;
