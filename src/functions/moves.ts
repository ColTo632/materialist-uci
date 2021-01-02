import {
    getUp,
    getDown,
    getUpUpRight,
    getUpUpLeft,
    getRightRightUp,
    getRightRightDown,
    getDownDownRight,
    getDownDownLeft,
    getLeftLeftUp,
    getLeftLeftDown,
    getUpLeft,
    getUpRight,
    getDownLeft,
    getDownRight,
    getRight,
    getLeft,
} from "./geometry";
import { Color, Cord, Move, Piece, State } from "../model";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "../pieces";

export const getPositionsByColor = (gs: State, color: Color): Set<Cord> =>
    new Set(gs.pieces.filter((p) => p.color == color).map((p) => p.loc));

export const isValid = (loc: Cord): boolean =>
    -1 < loc.x && loc.x < 8 && -1 < loc.y && loc.y < 8;

export const isCheck = (gs: State): boolean => {
    // TODO
    return false;
};

export const applyMove = (gs: State, move: Move): State => {
    // TODO remember do not mutate passed state
    return new State();
};

export const getMoves = (gs: State): Move[] => {
    const pieceMoves: Move[][] = [];
    getPiecesByColor(gs, gs.toMove).forEach((p) =>
        pieceMoves.push(getMovesForPiece(gs, p)),
    );
    return pieceMoves.flat();
};

export const getPiecesByColor = (gs: State, color: Color): Set<Piece> =>
    new Set(gs.pieces.filter((p) => p.color == color));

export const getMovesForPiece = (gs: State, p: Piece): Move[] => {
    const allyPositions = getPositionsByColor(gs, p.color);
    const enemyPositions = getPositionsByColor(gs, !p.color);

    let options: Cord[];

    switch (typeof p) {
        case typeof Pawn: {
            options = [];

            if (p.color) {
                options.push(getUp(p.loc));
            } else {
                options.push(getDown(p.loc));
            }

            // TODO Attack
            // TODO First move 2 squares
            // TODO En Passant
            // TODO Promotion

            break;
        }
        case typeof Knight: {
            options = [
                getUpUpRight(p.loc),
                getUpUpLeft(p.loc),
                getRightRightUp(p.loc),
                getRightRightDown(p.loc),
                getDownDownRight(p.loc),
                getDownDownLeft(p.loc),
                getLeftLeftUp(p.loc),
                getLeftLeftDown(p.loc),
            ];

            break;
        }
        case typeof Bishop: {
            options = [];
            let cur;

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUpLeft(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUpRight(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDownLeft(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDownRight(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            break;
        }
        case typeof Rook: {
            options = [];
            let cur;

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUp(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDown(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getRight(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getLeft(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));
            break;
        }
        case typeof Queen: {
            options = [];
            let cur;

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUpLeft(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUpRight(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDownLeft(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDownRight(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUp(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDown(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getRight(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            cur = p.loc;
            do {
                options.push(cur);
                cur = getLeft(cur);
            } while (isValid(cur) && !enemyPositions.has(cur));

            break;
        }
        case typeof King: {
            options = [
                getUp(p.loc),
                getLeft(p.loc),
                getRight(p.loc),
                getDown(p.loc),
                getDownRight(p.loc),
                getDownLeft(p.loc),
                getUpLeft(p.loc),
                getUpRight(p.loc),
            ];

            // TODO Castling
            break;
        }
        default: {
            throw new Error("Invalid Piece Type");
        }
    }
    return options
        .filter((loc) => isValid(loc))
        .filter((loc) => !allyPositions.has(loc))
        .map((loc) => new Move(undefined, p.loc, loc))
        .filter((move) => !isCheck(applyMove(gs, move)));
};
