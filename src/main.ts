import generateBoard from "./gen/generator";
import { boardState } from "./state/boardState";
import "./style.css";

import { render } from "./ui/render";
import { checkVictory, victoryModal } from "./ui/victory/victory";

boardState.subscribe(render);

boardState.setBoard(generateBoard(10, 10, 10));

boardState.subscribe((board) => {
    if (checkVictory(board)) {
        victoryModal[0]();
    }
});
