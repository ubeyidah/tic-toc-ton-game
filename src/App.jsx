import React from "react";
import Box from "./Box";
import "./index.css";

export default function App() {
  const [boxs, setBox] = React.useState([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
    { id: 4, value: "" },
    { id: 5, value: "" },
    { id: 6, value: "" },
    { id: 7, value: "" },
    { id: 8, value: "" },
    { id: 9, value: "" },
  ]);
  const [crntPlyer, setCrntPlayer] = React.useState("X");
  const [winer, setWiner] = React.useState("");

  // change current player
  function toggleCurentPlayer() {
    setCrntPlayer((prevPlayer) => (prevPlayer === "X" ? "O" : "X"));
  }

  // toggle boxs
  function toggle(id) {
    if (!winer) {
      setBox((oldBox) =>
        oldBox.map((box) =>
          box.id === id && !box.value ? { ...box, value: crntPlyer } : box
        )
      );
      // don't change player when user click two times the same btn
      boxs.forEach((box) => {
        if (box.id === id) {
          if (!box.value) {
            toggleCurentPlayer();
          }
        }
      });
    }
  }

  // pridict chance of win
  function pridictWiner(index1, index2, index3) {
    let isTrue = false;
    if (index1.value) {
      const testBoxs = [index1, index2, index3];
      const sampleValue = index1.value;
      isTrue = testBoxs.every((box) => box.value === sampleValue);
      isTrue ? setWiner(sampleValue) : "";
    }
    return isTrue;
  }

  React.useEffect(() => {
    if (
      pridictWiner(boxs[0], boxs[4], boxs[8]) ||
      pridictWiner(boxs[0], boxs[1], boxs[2]) ||
      pridictWiner(boxs[3], boxs[4], boxs[5]) ||
      pridictWiner(boxs[6], boxs[7], boxs[8]) ||
      pridictWiner(boxs[2], boxs[4], boxs[6]) ||
      pridictWiner(boxs[0], boxs[3], boxs[6]) ||
      pridictWiner(boxs[1], boxs[4], boxs[7]) ||
      pridictWiner(boxs[2], boxs[5], boxs[8])
    ) {
      pridictWiner(boxs[0], boxs[4], boxs[8]);
      pridictWiner(boxs[0], boxs[1], boxs[2]);
      pridictWiner(boxs[3], boxs[4], boxs[5]);
      pridictWiner(boxs[6], boxs[7], boxs[8]);
      pridictWiner(boxs[2], boxs[4], boxs[6]);
      pridictWiner(boxs[0], boxs[3], boxs[6]);
      pridictWiner(boxs[1], boxs[4], boxs[7]);
      pridictWiner(boxs[2], boxs[5], boxs[8]);
    } else if (boxs.every((box) => box.value)) {
      setWiner("Tie");
    }
  }, [boxs]);

  // reset game
  function newGame() {
    setBox([
      { id: 1, value: "" },
      { id: 2, value: "" },
      { id: 3, value: "" },
      { id: 4, value: "" },
      { id: 5, value: "" },
      { id: 6, value: "" },
      { id: 7, value: "" },
      { id: 8, value: "" },
      { id: 9, value: "" },
    ]);
    setWiner("");
    setCrntPlayer("X");
  }

  return (
    <main>
      {!winer ? (
        <div className="app">
          <h1>Tic Toc Toe Game</h1>
          <div className="boxs">
            {boxs.map((box) => (
              <Box
                key={box.id}
                toggle={() => toggle(box.id)}
                value={box.value}
              />
            ))}
          </div>
        </div>
      ) : (
        winer && (
          <div className="game-over">
            <h1>
              <span>{winer}</span> {winer !== "Tie" && " : Wins"}
            </h1>
            <button className="game-over-btn" onClick={newGame}>
              New Game
            </button>
          </div>
        )
      )}
    </main>
  );
}
