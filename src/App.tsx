import "./App.css";
import Game from "./components/Game";
import GameContextProvider from "./components/GameContextProvider";
import { CellState } from "./types";

export default function App() {
  const cellsStateInit: Record<number, CellState> = Array.from(
    Array(36).keys()
  ).reduce((acc: Record<number, CellState>, curr: number) => {
    acc[curr] = CellState.Hidden;
    return acc;
  }, {});
  return (
    <GameContextProvider
      defaultCellsState={cellsStateInit}
      defaultField={[]}
      defaultUserChoice={[null, null]}
    >
      <div className="container" id="__cy_root" data-cy-root>
        <Game />
      </div>
    </GameContextProvider>
  );
}

// 1. Create field
// 2. Let user open 2 cards
//    --- same - dissapear in 3 sec
//    --- different - hide in 3 sec
// 3 data state
//    card number, shown/hidden/removed

// timer, random field generator, is same functionality
