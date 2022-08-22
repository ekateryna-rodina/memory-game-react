import Game from "../../src/components/Game";
import GameContextProvider from "../../src/components/GameContextProvider";
import useInitField from "../../src/hooks/useInitField";
import { CellState } from "../../src/types";
const fieldSelector = "[data-cy=field]";
const playGameButtonSelector = "[data-cy=start-game-button]";
const getItemsIdx = (field: number[], number: number) => {
  return field.reduce((acc: number[], curr, i) => {
    if (curr === number) {
      acc.push(i);
    }
    return acc;
  }, []);
};
describe("testing the game", () => {
  const generate = useInitField();
  const field = generate();
  it("Field is shown when some cells are not guessed", () => {
    const cellsState: { [x: number]: CellState } = field.reduce(
      (acc: { [c: number]: CellState }, curr, ind) => {
        acc[ind] = CellState.Hidden;
        return acc;
      },
      {}
    );
    cy.mount(
      <GameContextProvider
        defaultField={field}
        defaultUserChoice={[null, null]}
        defaultCellsState={cellsState}
      >
        <Game />
      </GameContextProvider>
    );
    cy.get(fieldSelector).should("be.visible");
  });
  it("Button play again is shown when all cells are guessed", () => {
    const cellsState: { [x: number]: CellState } = field.reduce(
      (acc: { [c: number]: CellState }, curr, ind) => {
        acc[ind] = CellState.Removed;
        return acc;
      },
      {}
    );

    cy.mount(
      <GameContextProvider
        defaultField={field}
        defaultUserChoice={[null, null]}
        defaultCellsState={cellsState}
      >
        <Game />
      </GameContextProvider>
    );
    cy.get(playGameButtonSelector).should("be.visible");
  });
  it("field has 36 cells with clickable buttons", () => {
    const cellsState: { [x: number]: CellState } = field.reduce(
      (acc: { [c: number]: CellState }, curr, ind) => {
        acc[ind] = CellState.Hidden;
        return acc;
      },
      {}
    );
    cy.mount(
      <GameContextProvider
        defaultField={field}
        defaultUserChoice={[null, null]}
        defaultCellsState={cellsState}
      >
        <Game />
      </GameContextProvider>
    );

    cy.get(fieldSelector).find("button").its("length").should("eq", 36);
  });
  it("field has 30 cells with clickable buttons, rest 6 are rremoved because those numbers are being guessed", () => {
    const cellsState: { [x: number]: CellState } = field.reduce(
      (acc: { [c: number]: CellState }, curr, ind) => {
        if (field[ind] === 1 || field[ind] === 2 || field[ind] === 3) {
          acc[ind] = CellState.Removed;
        } else {
          acc[ind] = CellState.Hidden;
        }
        return acc;
      },
      {}
    );

    cy.mount(
      <GameContextProvider
        defaultField={field}
        defaultUserChoice={[null, null]}
        defaultCellsState={cellsState}
      >
        <Game />
      </GameContextProvider>
    );

    cy.get(fieldSelector).find("button").its("length").should("eq", 30);
  });
  it("When click a button number is revealed", () => {
    const _cellsState: { [x: number]: CellState } = field.reduce(
      (acc: { [c: number]: CellState }, curr, ind) => {
        acc[ind] = CellState.Hidden;
        return acc;
      },
      {}
    );

    cy.mount(
      <GameContextProvider
        defaultField={field}
        defaultUserChoice={[null, null]}
        defaultCellsState={_cellsState}
      >
        <Game />
      </GameContextProvider>
    );
    // button exists and card label doesn't
    cy.get(fieldSelector)
      .find('[data-cy="cell_button_1"]')
      .first()
      .should("exist");
    cy.get(fieldSelector).should(
      "not.have.descendants",
      '[data-cy="cell_number_1"]'
    );
    // click
    cy.get(fieldSelector)
      .find('[data-cy="cell_button_1"]')
      .first()
      .click({ force: true });
    // first button is hidden and cells number is shown

    cy.get(fieldSelector)
      .find('[data-cy="cell_button_1"]')
      .its("length")
      .should("eq", 1);

    cy.get(fieldSelector).should(
      "have.descendants",
      '[data-cy="cell_number_1"]'
    );
  });

  it("Less/more then two buttons with same number are not possible", () => {
    const cellsState: { [x: number]: CellState } = field.reduce(
      (acc: { [c: number]: CellState }, curr, ind) => {
        acc[ind] = CellState.Hidden;
        return acc;
      },
      {}
    );

    cy.mount(
      <GameContextProvider
        defaultField={field}
        defaultUserChoice={[null, null]}
        defaultCellsState={cellsState}
      >
        <Game />
      </GameContextProvider>
    );
    for (let i = 1; i <= 18; i++) {
      cy.get(fieldSelector)
        .find(`[data-cy=cell_button_${i}]`)
        .its("length")
        .should("eq", 2);
    }
  });
  it("user can reveal only two cells at a time and blocked for 3 seconds", () => {
    const cellsState: { [x: number]: CellState } = field.reduce(
      (acc: { [c: number]: CellState }, curr, ind) => {
        acc[ind] = CellState.Hidden;
        return acc;
      },
      {}
    );

    cy.mount(
      <GameContextProvider
        defaultField={field}
        defaultUserChoice={[null, null]}
        defaultCellsState={cellsState}
      >
        <Game />
      </GameContextProvider>
    );
    cy.get(fieldSelector).find(`button`).first();

    cy.get("button").then(($elements) => {
      cy.wrap($elements[0]).click({ force: true });
    });
    cy.get("button").then(($elements) => {
      cy.wrap($elements[1]).click({ force: true });
    });

    cy.get("button").then(($elements) => {
      cy.wrap($elements[4]).click({ force: true });
    });
    cy.get("[data-cy^=cell_number_]").its("length").should("eq", 2);
  });
  it("cells are being removed", () => {
    const cellsState: { [x: number]: CellState } = field.reduce(
      (acc: { [c: number]: CellState }, curr, ind) => {
        acc[ind] = CellState.Hidden;
        return acc;
      },
      {}
    );
    cy.mount(
      <GameContextProvider
        defaultField={field}
        defaultUserChoice={[null, null]}
        defaultCellsState={cellsState}
      >
        <Game />
      </GameContextProvider>
    );
    cy.get("[data-cy=cell_button_2]").its("length").should("eq", 2);
    const idx = getItemsIdx(field, 2);
    cy.get("button").then(($elements) => {
      cy.wrap($elements[idx[0]]).click({ force: true });
      cy.wrap($elements[idx[1]]).click({ force: true });
    });
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(3500);
    cy.get("[data-cy=cell_button_2]").should("not.exist");
    cy.get("[data-cy=cell_number_2]").should("not.exist");
  });
  it("cells are being hidden again", () => {
    const cellsState: { [x: number]: CellState } = field.reduce(
      (acc: { [c: number]: CellState }, curr, ind) => {
        acc[ind] = CellState.Hidden;
        return acc;
      },
      {}
    );
    cy.mount(
      <GameContextProvider
        defaultField={field}
        defaultUserChoice={[null, null]}
        defaultCellsState={cellsState}
      >
        <Game />
      </GameContextProvider>
    );
    cy.get("[data-cy=cell_button_2]").its("length").should("eq", 2);
    cy.get("[data-cy=cell_button_4]").its("length").should("eq", 2);

    cy.get("[data-cy=cell_button_2]").first().click({ force: true });
    cy.get("[data-cy=cell_button_4]").first().click({ force: true });
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(3500);
    cy.get("[data-cy=cell_button_2]").its("length").should("eq", 2);
    cy.get("[data-cy=cell_button_4]").its("length").should("eq", 2);
  });
});
