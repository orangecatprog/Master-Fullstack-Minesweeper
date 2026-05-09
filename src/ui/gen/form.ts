import { formFrom } from "../../shared/forms/formGenerator";
import generateBoard from "../../gen/generator";
import { boardState } from "../../state/boardState";
import { context } from "../../state/locked";
import { resetTimer } from "../timer/timer";

export const generateForm = (close: () => void) =>
    formFrom({
        fields: [
            {
                label: "Width",
                type: "number",
                id: "width",
                min: 5,
                max: 100,
                value: 10,
            },
            {
                label: "Height",
                type: "number",
                id: "height",
                min: 5,
                max: 100,
                value: 10,
            },
            {
                label: "Mines",
                type: "number",
                id: "mines",
                min: 5,
                max: 100,
                value: 10,
            },
        ],
        submitBtn: {
            text: "Generate",
        },
        onSubmit: (data) => {
            const board = generateBoard(
                data.width as number,
                data.height as number,
                data.mines as number,
            );
            boardState.setBoard(board);
            context.lockBoard = false;
            context.gameStarted = false;
            resetTimer();
            close();
        },
        id: "generateForm",
    });
