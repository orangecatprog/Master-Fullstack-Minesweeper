import type { Board } from "../../shared/board";
import { modalFrom } from "../../shared/modal/modal";
import { open } from "../gen/modal";

export const checkVictory = (board: Board): boolean => {
    const cells = board.flat();
    const nonMines = cells.filter((c) => !c.mine);
    const mines = cells.filter((c) => c.mine);
    return nonMines.every((c) => c.revealed) && mines.every((c) => c.flagged);
};

export const victoryModal = modalFrom(
    (close) => {
        const container = document.createElement("div");
        container.className = "gameover-body";

        const msg = document.createElement("p");
        msg.textContent = "🎉 Congratulations! You won!";
        msg.style.color = "#81c784";

        const btn = document.createElement("button");
        btn.className = "restart-btn";
        btn.textContent = "Play Again";
        btn.addEventListener("click", () => {
            document.getElementById("open-game")?.click();
            open();
            close();
        });

        container.append(msg, btn);
        return container;
    },
    {
        id: "victory-modal",
        title: "Victory",
    },
);
