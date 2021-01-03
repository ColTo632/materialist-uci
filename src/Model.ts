export class State {
    public constructor(
        pieces: Piece[],
        toMove: boolean,
        castleAvaliability: string,
        enpassantTarget: Cord | null,
        halfMove: number,
        fullMove: number,
    ) {
        this.pieces = pieces;
        this.toMove = toMove;
        this.castleAvaliability = castleAvaliability;
        this.enpassantTarget = enpassantTarget;
        this.halfMove = halfMove;
        this.fullMove = fullMove;
    }

    readonly castleAvaliability: string;
    readonly enpassantTarget?: Cord | null;

    readonly halfMove: number;
    readonly fullMove: number;

    readonly toMove: Color;
    readonly pieces: Piece[];
}

// Let white = true and black = false
export type Color = boolean;

export abstract class Piece {
    constructor(loc: Cord, color: Color) {
        this.loc = new Cord(undefined, loc.x, loc.y);
        this.color = color;
    }

    abstract readonly val: number;
    abstract readonly type: PieceType;
    readonly loc: Cord;
    readonly color: Color;
}

export class Move {
    public constructor(
        alg?: string,
        from?: Cord,
        to?: Cord,
        promotion?: Promotions,
    ) {
        if (alg) {
            this.from = new Cord(alg.substring(0, 2));
            this.to = new Cord(alg.substring(2, 3));

            if (alg.length > 4) {
                this.promotion = alg.substring(3) as Promotions;
            }
        } else if (from && to) {
            this.from = new Cord(undefined, from.x, from.y);
            this.to = new Cord(undefined, to.x, to.y);

            if (promotion) {
                this.promotion = promotion;
            }
        } else {
            throw new Error("Insuffiecent args passed to Move Constructor");
        }
    }

    readonly from: Cord;
    readonly to: Cord;
    readonly promotion?: Promotions;

    // Need to error check on null promotion
    toString = (): string =>
        this.from.toString() + this.to.toString() + this.promotion;
}

export type PieceType = NotPromotions | Promotions;

export enum NotPromotions {
    Pawn = "p",
    King = "k",
}

export enum Promotions {
    Rook = "r",
    Knight = "n",
    Bishop = "b",
    Queen = "q",
}

export class Cord {
    public constructor(alg?: string, x?: number, y?: number) {
        if (alg) {
            this.x = STRING_TO_X.get(alg.charAt(0))!;
            this.y = STRING_TO_Y.get(alg.charAt(1))!;
        } else if (x != undefined && y != undefined) {
            this.x = x;
            this.y = y;
        } else {
            throw new Error("Insufficent Args passed to Cord constructor");
        }
    }

    readonly x: number;
    readonly y: number;

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
