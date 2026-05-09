import { getCellSpan } from "../core/getCellSpan";
import { reveal } from "../core/reveals";
import { boardState } from "../../state/boardState";
import type { Board, Cell } from "../../shared/board";
import { context } from "../../state/locked";

export const board = (boardData: Board): HTMLElement => {
    const boardElement = document.createElement("div");
    boardElement.classList.add("board");

    if (!boardData) return boardElement;

    boardData.forEach((row: Cell[], y: number) => {
        if (!row) return;
        const rowElement = document.createElement("div");
        rowElement.classList.add("row");
        row.forEach((cell: Cell, x: number) => {
            const cellElement = document.createElement("button");
            cellElement.classList.add("cell");
            if (cell.revealed) cellElement.classList.add("revealed");
            if (cell.revealed && cell.mine) cellElement.classList.add("mine");
            if (cell.flagged) cellElement.classList.add("flagged");

            cellElement.addEventListener("mousedown", (evt) => {
                if (context.lockBoard) return;

                if (evt.button === 2) {
                    evt.preventDefault();
                    if (cell.revealed) return;
                    cell.flagged = !cell.flagged;
                    boardState.setBoard(boardData);
                    if (context.flagCount >= 10) return;
                    context.flagCount++;
                    return;
                }

                if (evt.button === 0) {
                    if (cell.revealed) return;
                    if (cell.flagged) return;
                    reveal(x, y, boardData);
                }
            });

            cellElement.addEventListener("contextmenu", (evt) => {
                evt.preventDefault();
            });

            cellElement.appendChild(getCellSpan(x, y, boardData));
            rowElement.appendChild(cellElement);
        });
        boardElement.appendChild(rowElement);
    });
    return boardElement;
};
