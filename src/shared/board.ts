
export interface Cell {
    revealed: boolean
    flagged: boolean
    mine: boolean
    aroundingMines: number
}
export type Board = Cell[][]