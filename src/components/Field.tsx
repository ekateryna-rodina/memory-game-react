import { useContext, useEffect } from "react";
import { GameContext } from "../GameContext";
import useTimer from "../hooks/useTimer";
import { CellState } from "../types";
import Cell from "./Cell";

const Field = () => {
  const { start } = useTimer();
  const { userChoice, setUserChoice, cellsState, setCellsState, field } =
    useContext(GameContext);
  const checkUserChoice = () => {
    const firstCell = userChoice[0];
    const secondCell = userChoice[1];
    if (field[firstCell as number] === field[secondCell as number]) {
      setCellsState({
        ...cellsState,
        [firstCell as number]: CellState.Removed,
        [secondCell as number]: CellState.Removed,
      });
    } else {
      setCellsState({
        ...cellsState,
        [firstCell as number]: CellState.Hidden,
        [secondCell as number]: CellState.Hidden,
      });
    }
    setUserChoice([null, null]);
  };
  useEffect(() => {
    // startTimer
    if (userChoice[0] !== null && userChoice[1] !== null) {
      start(checkUserChoice);
    }

    // eslint-disable-next-line
  }, [userChoice]);

  return (
    <div className="field__grid" data-cy="field">
      {Array.from(Array(36).fill(0)).map((item, i) => (
        <Cell key={`${field[i]}_${i}`} index={i} />
      ))}
    </div>
  );
};

export default Field;
