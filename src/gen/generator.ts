import type { Board } from "../shared/board";
import calculateAroundingMines from "./calcs/aroundingMines";

const generateBoard = (width: number, height: number, mines: number): Board => {
    if (width < 1 || height < 1) return [];

    const board: Board = [];

    for (let i = 0; i < height; i++) {
        board.push([]);

        for (let j = 0; j < width; j++) {
            board[i].push({
                revealed: false,
                flagged: false,
                mine: false,
                aroundingMines: 0,
            });
        }
    }

    const totalCells = width * height;
    const actualMines = Math.min(mines, totalCells);
    let placed = 0;

    while (placed < actualMines) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);

        if (!board[y][x].mine) {
            board[y][x].mine = true;
            placed++;
        }
    }

    return calculateAroundingMines(board);
};

export default generateBoard;
