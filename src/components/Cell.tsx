import { useContext } from "react";
import { GameContext } from "../GameContext";
import useTimer from "../hooks/useTimer";
import { CellState } from "../types";

type CellProps = {
  index: number;
};
const Cell = ({ index }: CellProps) => {
  const { userChoice, setUserChoice, setCellsState, cellsState, field } =
    useContext(GameContext);
  const { isRunning } = useTimer();
  const revealHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (userChoice[0] !== null && userChoice[1] !== null) return;
    // set state
    setCellsState({ ...cellsState, [index]: CellState.Shown });
    if (userChoice[0] === null) {
      setUserChoice([index, null]);
    } else {
      setUserChoice([userChoice[0], index]);
    }
  };
  return (
    <>
      <div className="field__cell">
        {cellsState![index] === CellState.Shown ? (
          <div
            className="field__cell--shown"
            data-cy={`cell_number_${field[index]}`}
          >
            {field[index]}
          </div>
        ) : cellsState![index] === CellState.Removed ? (
          <></>
        ) : (
          <div className="field__cell--hidden">
            <button
              data-cy={`cell_button_${field[index]}`}
              onClick={isRunning ? () => null : revealHandler}
            >
              {" "}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cell;
