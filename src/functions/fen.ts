import { Cord, Piece } from "../model";
import { getRight } from "./geometry";
import { isValid } from "./moves";

const getNextFenLoc = (loc: Cord): Cord => {
    const right = getRight(loc);
    return isValid(right) ? right : new Cord(undefined, 0, loc.y - 1);
};

export const parseFenPosString = (fen: string): Piece[] => {
    //TODO
    return [];
};
