import type { Board } from "../shared/board";
import { board } from "./game/board";
import { btn } from "./gen/modal";
import { createTimer } from "./timer/timer";

export const render = (boardData: Board) => {
    const app = document.getElementById("app")!;

    app.innerHTML = "";

    app.appendChild(document.createElement("h1")).textContent = "Minesweeper";

    const top = document.createElement("div");
    top.className = "top-bar";
    top.appendChild(btn);
    top.appendChild(createTimer());
    app.appendChild(top);

    app.appendChild(board(boardData));
};
