import { modalFrom } from "../../shared/modal/modal";

const body = document.createElement("div");
body.className = "gameover-body";

const msg = document.createElement("p");
msg.textContent = "💥 You hit a mine!";

const restartBtn = document.createElement("button");
restartBtn.className = "restart-btn";
restartBtn.textContent = "New Game";
restartBtn.addEventListener("click", () => {
    document.getElementById("open-game")?.click();
    gameoverModal[1]();
});

body.append(msg, restartBtn);

export const gameoverModal = modalFrom(
    () => body,
    {
        id: "gameover-modal",
        title: "Game Over",
    },
)
