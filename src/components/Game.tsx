import React, { useEffect, useState } from "react";
import { GameContext } from "../GameContext";
import useInitField from "../hooks/useInitField";
import { CellState } from "../types";
import Field from "./Field";

const Game = () => {
  const [gameOver, setGameOver] = useState<boolean>(false);
  const generate = useInitField();
  const { field, setField, cellsState } = React.useContext(GameContext);
  function generateField() {
    const data = generate();
    setField(data);
  }
  useEffect(() => {
    if (field?.length) return;
    generateField();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    const isOver =
      Object.values(cellsState as Record<number, CellState>).filter(
        (v) => v === CellState.Removed
      ).length === Object.keys(cellsState as Record<number, CellState>).length;
    setGameOver(isOver);
  }, [cellsState]);
  return (
    <>
      <h3>Let's see how good is your memory (and make it better)!</h3>
      {gameOver ? (
        <div className="game_start-game-container">
          <button data-cy="start-game-button" onClick={generateField}>
            Start Game!
          </button>
        </div>
      ) : (
        <Field />
      )}
      {Object.values(cellsState as Record<number, CellState>).map((v, i) => (
        <div key={`${CellState[v as keyof typeof cellsState]}_${i}`}>
          {CellState[v as keyof typeof cellsState]}
        </div>
      ))}
    </>
  );
};

export default Game;
