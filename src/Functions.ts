import { Cord, Move, Piece, State } from "./model";
import { Bishop, King, Knight, Pawn, Queen, Rook } from "./pieces";

export const getPositions = (gs: State): Set<Cord> =>
    new Set(gs.pieces.map((p) => p.loc));

export const getMoves = (gs: State): Move[] => {
    // TODO
    return [];
};

export const isCheck = (gs: State): boolean => {
    // TODO
    return false;
};

export const applyMove = (gs: State, move: Move): State => {
    // TODO remember do not mutate passed state
    return new State();
};

export const getMovesForPiece = (gs: State, p: Piece): Move[] => {
    // TODO

    const moves: Move[] = [];

    switch (typeof p) {
        case typeof Pawn: {
            // TODO
            // TODO Attack
            // TODO First move 2 squares
            // TODO En Passant
            // TODO Promotion
            break;
        }
        case typeof Knight: {
            // TODO
            break;
        }
        case typeof Bishop: {
            // TODO
            break;
        }
        case typeof Rook: {
            // TODO
            break;
        }
        case typeof Queen: {
            // TODO
            break;
        }
        case typeof King: {
            // TODO
            // TODO Castling
            break;
        }
        default: {
            throw new Error("Invalid Piece Type");
        }
    }
    return moves.filter((move) => !isCheck(applyMove(gs, move)));
};
