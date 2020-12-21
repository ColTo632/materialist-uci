export class State {
    toMove: Color
    pieces: Piece[]
}

export type Color =  "white" | "black";

export interface Piece {
    val: number
    loc: Cord
    color: Color

    // Should move out of the model file to enforce functional practice
    getMoves: (obs: Set<Cord>) => Set<Move>
}

export class Move {

    public constructor (alg: string) {
        this.from = new Cord(alg.substring(0, 2));
        this.from = new Cord(alg.substring(2, 3));

        // Need to error check on string length
        this.promotion = alg.substring(3) as Promotion;
    }

    from: Cord
    to: Cord
    promotion?: Promotion

    // Need to error check on null promotion
    toString = (): string => this.from.toString() + this.to.toString() + this.promotion
}

export type Promotion = "r" | "k" | "b" | "q"

export class Cord {

    public constructor (alg: string) {
        this.x = STRING_TO_X[alg.charAt(0)]
        this.y = STRING_TO_Y[alg.charAt(1)]
    }

    x: number
    y: number

    toString = (): string => X_TO_STRING[this.x] + Y_TO_STRING[this.y]
}



const X_TO_STRING = new Map<number, string>([[0, "a"], [1, "b"], [2, "c"], [3, "d"], [4, "e"], [5, "f"], [6, "g"], [7, "h"]]);
const STRING_TO_X = new Map<string, number>([["a", 0], ["b", 1], ["c", 2], ["d", 3], ["e", 4], ["f", 5], ["g", 6], ["h", 7]]);

const Y_TO_STRING = new Map<number, string>([[0, "1"], [1, "2"], [2, "3"], [3, "4"], [4, "5"], [5, "6"], [6, "7"], [7, "8"]]);
const STRING_TO_Y = new Map<string, number>([["1", 0], ["2", 0], ["3", 2], ["4", 3], ["5", 4], ["6", 5], ["7", 6], ["8", 7]]);