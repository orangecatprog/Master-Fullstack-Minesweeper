import { modalFrom } from "../../shared/modal/modal";
import { context } from "../../state/locked";
import { generateForm } from "./form";

export const [open, close] = modalFrom((close) => generateForm(close), {
    id: "new-game-modal",
    title: "New Game",
});

const openModal = () => {
    if (context.lockBoard) return;
    open();
};

export const btn = document.createElement("button");
btn.id = "open-game";
btn.textContent = "New Game";
btn.addEventListener("click", openModal);
