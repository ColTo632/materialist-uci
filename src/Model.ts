export class State {
    public constructor(fen: string | undefined) {
        if (fen) {
            //TODO
            this.toMove = "white";
            this.pieces = [];

            this.halfMove = 0;
            this.fullMove = 0;
        } else {
            this.toMove = "white";
            this.pieces = []; // TODO define start state

            this.halfMove = 0;
            this.fullMove = 0;
        }
    }

    castleAvaliability: null; // TODO Define type
    enpassantTarget: null; // TODO Define type

    halfMove: number;
    fullMove: number;

    toMove: Color;
    pieces: Piece[];
}

export type Color = "white" | "black";

export interface Piece {
    val: number;
    loc: Cord;
    color: Color;
}

export class Move {
    public constructor(alg: string) {
        this.from = new Cord(alg.substring(0, 2));
        this.to = new Cord(alg.substring(2, 3));

        // Need to error check on string length
        this.promotion = alg.substring(3) as Promotion;
    }

    from: Cord;
    to: Cord;
    promotion?: Promotion;

    // Need to error check on null promotion
    toString = (): string =>
        this.from.toString() + this.to.toString() + this.promotion;
}

export type Promotion = "r" | "k" | "b" | "q";

export class Cord {
    public constructor(alg: string) {
        this.x = STRING_TO_X.get(alg.charAt(0))!;
        this.y = STRING_TO_Y.get(alg.charAt(1))!;
    }

    x: number;
    y: number;

    toString = (): string =>
        X_TO_STRING.get(this.x)! + Y_TO_STRING.get(this.y)!;
}

const X_TO_STRING = new Map<number, string>([
    [0, "a"],
    [1, "b"],
    [2, "c"],
    [3, "d"],
    [4, "e"],
    [5, "f"],
    [6, "g"],
    [7, "h"],
]);

const STRING_TO_X = new Map<string, number>([
    ["a", 0],
    ["b", 1],
    ["c", 2],
    ["d", 3],
    ["e", 4],
    ["f", 5],
    ["g", 6],
    ["h", 7],
]);

const Y_TO_STRING = new Map<number, string>([
    [0, "1"],
    [1, "2"],
    [2, "3"],
    [3, "4"],
    [4, "5"],
    [5, "6"],
    [6, "7"],
    [7, "8"],
]);

const STRING_TO_Y = new Map<string, number>([
    ["1", 0],
    ["2", 0],
    ["3", 2],
    ["4", 3],
    ["5", 4],
    ["6", 5],
    ["7", 6],
    ["8", 7],
]);
