import React, { useState } from "react";
import { GameContext } from "../GameContext";
import { CellState } from "../types";

type GameContextProviderProps = {
  children: React.ReactNode;
  defaultField: number[];
  defaultUserChoice?: (number | null)[];
  defaultCellsState: { [c: number]: CellState };
};
const GameContextProvider: React.FC<GameContextProviderProps> = ({
  children,
  defaultCellsState,
  defaultField,
}) => {
  const [userChoice, setUserChoice] = useState<(number | null)[]>([null, null]);
  const [cellsState, setCellsState] = useState<{ [c: number]: CellState }>(
    defaultCellsState
  );
  const [field, setField] = useState<number[]>(defaultField);
  const initialState = {
    userChoice,
    cellsState,
    setUserChoice,
    setCellsState,
    field,
    setField,
  };
  return (
    <GameContext.Provider value={initialState}>{children}</GameContext.Provider>
  );
};

export default GameContextProvider;
