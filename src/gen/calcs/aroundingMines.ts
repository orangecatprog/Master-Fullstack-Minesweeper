import type { Board } from "../../shared/board";

const countAroundingMines = (board: Board, x: number, y: number): number => {
    let count = 0;

    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            if (i >= 0 && i < board.length && j >= 0 && j < board[i].length) {
                if (board[i][j].mine) {
                    count++;
                }
            }
        }
    }

    return count;
};

export const calculateAroundingMines = (board: Board): Board => {
    const newBoard: Board = [];

    for (let i = 0; i < board.length; i++) {
        newBoard.push([]);

        for (let j = 0; j < board[i].length; j++) {
            const cell = board[i][j];

            if (cell.mine) {
                cell.aroundingMines = 0;
            } else {
                cell.aroundingMines = countAroundingMines(board, i, j);
            }

            newBoard[i].push(cell);
        }
    }

    return newBoard;
};

export default calculateAroundingMines;
