import { Cord, Piece, State } from "../model";
import { getRight } from "./geometry";
import { isValid } from "./moves";

const startFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

const getNextFenLoc = (loc: Cord): Cord => {
    const right = getRight(loc);
    return isValid(right) ? right : new Cord(undefined, 0, loc.y - 1);
};

const parseFenPosString = (fen: string): Piece[] => {
    //TODO
    return [];
};

export const getStateFromFen = (fen = startFen): State => {
    const subfens = fen.split(" ");

    const pieces = parseFenPosString(subfens[0]);
    const toMove = subfens[1] == "w";

    const castleAvaliability = subfens[2];

    const enpassantTarget = subfens[1] == "-" ? null : new Cord(subfens[3]);

    const halfMove = parseInt(subfens[4]);
    const fullMove = parseInt(subfens[5]);

    return new State(
        pieces,
        toMove,
        castleAvaliability,
        enpassantTarget,
        halfMove,
        fullMove,
    );
};
