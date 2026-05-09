import type { Board } from "../../shared/board";
import { boardState } from "../../state/boardState";
import { context } from "../../state/locked";
import { gameoverModal } from "../gameover/modal";
import { checkVictory, victoryModal } from "../victory/victory";
import { startTimer, stopTimer } from "../timer/timer";

function revealCell(
    col: number,
    row: number,
    board: Board,
    hitMine: { value: boolean },
): void {
    const cell = board[row][col];
    if (cell.revealed) return;
    cell.revealed = true;

    if (cell.mine) {
        hitMine.value = true;
        return;
    }

    if (cell.aroundingMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const nr = row + dr;
                const nc = col + dc;
                if (
                    nr >= 0 &&
                    nr < board.length &&
                    nc >= 0 &&
                    nc < board[0].length
                ) {
                    revealCell(nc, nr, board, hitMine);
                }
            }
        }
    }
}

function revealAllMines(board: Board): void {
    for (const row of board) {
        for (const cell of row) {
            if (cell.mine) cell.revealed = true;
        }
    }
}

export const reveal = (col: number, row: number, board: Board): void => {
    const cell = board[row][col];
    if (cell.revealed) return;

    if (!context.gameStarted) {
        context.gameStarted = true;
        startTimer();
    }

    const hitMine = { value: false };
    revealCell(col, row, board, hitMine);

    if (hitMine.value) {
        stopTimer();
        revealAllMines(board);
        boardState.setBoard(board);
        context.lockBoard = true;
        setTimeout(() => gameoverModal[0](), 2000);
        return;
    }

    boardState.setBoard(board);

    if (checkVictory(board)) {
        stopTimer();
        context.lockBoard = true;
        setTimeout(() => victoryModal[0](), 300);
    }
};
