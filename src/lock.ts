import { State } from "./model";

class Lock {
    constructor() {
        this.go = false;
        this.root = new State();
    }

    go: boolean;
    root: State;

    reset = () => {
        this.go = false;
        this.root = new State();
    };
}

export const lock = new Lock();
