import { createContext } from "react";
import { CellState } from "./types";

export const GameContext = createContext<{
  userChoice: (number | null)[];
  cellsState: { [x: number]: CellState } | undefined;
  field: number[];
  setUserChoice: (userChoice: (number | null)[]) => void;
  setCellsState: (newState: { [x: number]: CellState }) => void;
  setField: (data: number[]) => void;
}>({
  userChoice: [null, null],
  cellsState: undefined,
  field: [],
  setUserChoice: (choice: (null | number)[]) => {},
  setCellsState: (state: { [x: number]: CellState }) => {},
  setField: (data: number[]) => {},
});
