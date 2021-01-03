import { getStateFromFen } from "./functions/fen";
import { State } from "./model";

class Lock {
    constructor() {
        this.go = false;
        this.root = getStateFromFen();
    }

    go: boolean;
    root: State;

    reset = () => {
        this.go = false;
        this.root = getStateFromFen();
    };
}

export const lock = new Lock();
