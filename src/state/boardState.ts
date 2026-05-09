import type { Board } from "../shared/board";

type Subscriber = (board: Board) => void;

class BoardState {
  private _board: Board = [];
  private _subscribers: Set<Subscriber> = new Set();

  get board(): Board {
    return this._board;
  }

  setBoard(board: Board): void {
    this._board = board;
    this._notify();
  }

  subscribe(fn: Subscriber): () => void {
    this._subscribers.add(fn);
    return () => this._subscribers.delete(fn);
  }

  private _notify(): void {
    for (const fn of this._subscribers) {
      fn(this._board);
    }
  }
}

export const boardState = new BoardState();
