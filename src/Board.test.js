import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Board from "./Board";

//smoke & snapshot tests
describe("<Board /> rendering and win state", function() {
    
    it("renders without crashing", function() {
        render(<Board />);
    });

    it("matches snapshot", function() {
        const {asFragment} = render(<Board chanceLightStartsOn={1} />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("shows win state when lights are out", function() {
        const { getByText } = render(<Board chanceLightStartsOn={0} />);
        expect(getByText("You Won!")).toBeInTheDocument();
      });

})

describe("game click state", function() {
    it("toggles lights", function() {
        const { getAllByRole } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);
        const cells = getAllByRole("button");

        //click the center of the board
        fireEvent.click(cells[4]);
        //all corner cells should be lit
        let litCells = [0, 2, 6, 8];
        cells.forEach((cell, i) => {
            if (litCells.includes(i)){
                expect(cell).toHaveClass("Cell-lit");
            } else {
                expect(cell).not.toHaveClass("Cell-lit");
            }
        });
    });

    it("show you won", function() {
        //set up board with 3 cells
        const {queryByText, getAllByRole} = render(<Board nrows={1} ncols={3} chanceLightStartsOn={1} />);
        expect(queryByText("You Won!")).not.toBeInTheDocument();

        //click on the center cell to win
        const cells = getAllByRole("button");
        fireEvent.click(cells[1]);
        expect(queryByText("You Won!")).toBeInTheDocument();
    });
})

