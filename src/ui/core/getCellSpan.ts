import type { Board } from "../../shared/board";

const getColor = (aroundingMines: number): string => {
    if (aroundingMines === 0) return "transparent";
    if (aroundingMines === 1) return "#4fc3f7";
    if (aroundingMines === 2) return "#81c784";
    if (aroundingMines === 3) return "#e57373";
    if (aroundingMines === 4) return "#ba68c8";
    return "#ffb74d";
};

export const getCellSpan = (
    col: number,
    row: number,
    board: Board,
): HTMLSpanElement => {
    const cell = board[row][col];
    const span = document.createElement("span");
    span.textContent = cell.revealed
        ? cell.mine
            ? "💣"
            : cell.aroundingMines > 0
              ? cell.aroundingMines.toString()
              : ""
        : "";
    span.textContent = cell.flagged ? "🚩" : span.textContent;
    if (cell.aroundingMines > 0) {
        span.style.color = getColor(cell.aroundingMines);
        span.style.fontWeight = "700";
    }
    return span;
};
