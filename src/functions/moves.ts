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
    getUpUp,
    getDownDown,
} from "./geometry";
import { Color, Cord, Move, NotPromotions, Piece, State } from "../model";
import { Bishop, buildPiece, King, Knight, Pawn, Queen, Rook } from "../pieces";

export const getPositionsByColor = (gs: State, color: Color): Set<string> =>
    new Set(
        gs.pieces.filter((p) => p.color == color).map((p) => p.loc.toString()),
    );

export const isValid = (loc: Cord): boolean =>
    -1 < loc.x && loc.x < 8 && -1 < loc.y && loc.y < 8;

export const isInCheck = (gs: State, color: boolean): boolean => {
    const king = gs.pieces.find((p) => p.type == "k" && p.color == color);

    if (king == undefined) {
        throw new Error("No king found in game state");
    }

    return new Set<string>(
        getPiecesByColor(gs, !color)
            .map((p) => getChecksForPiece(gs, p))
            .flat()
            .map((loc) => loc.toString()),
    ).has(king.loc.toString());
};

export const applyMove = (gs: State, move: Move): State => {
    const pieceToMove = gs.pieces.find((p) => p.loc == move.from);

    if (pieceToMove == undefined) {
        throw new Error("Tried to move piece that does not exist");
    }

    const newPieces = gs.pieces.filter(
        (p) => p.loc != move.from && p.loc != move.to,
    );

    if (move.promotion) {
        newPieces.push(buildPiece(move.promotion, move.to, pieceToMove.color));
    } else {
        newPieces.push(
            buildPiece(pieceToMove.type, move.to, pieceToMove.color),
        );
    }

    // TODO
    const newCastleAbility = "TODO";
    const newEnpassantTarget = null;

    const newHalfmove =
        gs.pieces.length < newPieces.length ||
        pieceToMove.type == NotPromotions.Pawn
            ? 0
            : gs.halfMove + 1;
    const newFullmove = gs.toMove ? gs.fullMove : gs.fullMove + 1;

    return new State(
        newPieces,
        !gs.toMove,
        newCastleAbility,
        newEnpassantTarget,
        newHalfmove,
        newFullmove,
    );
};

export const getMoves = (gs: State): Move[] => {
    return getPiecesByColor(gs, gs.toMove)
        .map((p) => getMovesForPiece(gs, p))
        .flat();
};

export const getPiecesByColor = (gs: State, color: Color): Piece[] =>
    gs.pieces.filter((p) => p.color == color);

export const getMovesForPiece = (gs: State, p: Piece): Move[] => {
    const allyPositions = getPositionsByColor(gs, p.color);
    const enemyPositions = getPositionsByColor(gs, !p.color);

    let moves: Move[];

    switch (typeof p) {
        case typeof Pawn: {
            moves = [];

            let oneSquare;
            let twoSquare;
            let attackA;
            let attackB;

            // White side
            if (p.color) {
                oneSquare = getUp(p.loc);
                twoSquare = getUpUp(p.loc);
                attackA = getUpRight(p.loc);
                attackB = getUpLeft(p.loc);
            }
            // Black side
            else {
                oneSquare = getDown(p.loc);
                twoSquare = getDownDown(p.loc);
                attackA = getDownRight(p.loc);
                attackB = getDownLeft(p.loc);
            }

            // TODO Move
            // TODO Move 2 squares on first
            // TODO Promote on final
            // TODO Attack
            // TODO En Passant

            break;
        }
        case typeof Knight: {
            moves = [
                getUpUpRight(p.loc),
                getUpUpLeft(p.loc),
                getRightRightUp(p.loc),
                getRightRightDown(p.loc),
                getDownDownRight(p.loc),
                getDownDownLeft(p.loc),
                getLeftLeftUp(p.loc),
                getLeftLeftDown(p.loc),
            ]
                .filter((loc) => isValid(loc))
                .filter((loc) => !allyPositions.has(loc.toString()))
                .map((loc) => new Move(undefined, p.loc, loc));

            break;
        }
        case typeof Bishop: {
            const options = [];
            let cur;

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUpLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUpRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDownLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDownRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            moves = options
                .filter((loc) => isValid(loc))
                .filter((loc) => !allyPositions.has(loc.toString()))
                .map((loc) => new Move(undefined, p.loc, loc));

            break;
        }
        case typeof Rook: {
            const options = [];
            let cur;

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUp(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDown(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            moves = options
                .filter((loc) => isValid(loc))
                .filter((loc) => !allyPositions.has(loc.toString()))
                .map((loc) => new Move(undefined, p.loc, loc));

            break;
        }
        case typeof Queen: {
            const options = [];
            let cur;

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUpLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUpRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDownLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDownRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getUp(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getDown(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                options.push(cur);
                cur = getLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            moves = options
                .filter((loc) => isValid(loc))
                .filter((loc) => !allyPositions.has(loc.toString()))
                .map((loc) => new Move(undefined, p.loc, loc));

            break;
        }
        case typeof King: {
            moves = [
                getUp(p.loc),
                getLeft(p.loc),
                getRight(p.loc),
                getDown(p.loc),
                getDownRight(p.loc),
                getDownLeft(p.loc),
                getUpLeft(p.loc),
                getUpRight(p.loc),
            ]
                .filter((loc) => isValid(loc))
                .filter((loc) => !allyPositions.has(loc.toString()))
                .map((loc) => new Move(undefined, p.loc, loc));
            break;
        }
        default: {
            throw new Error("Invalid Piece Type");
        }
    }
    return moves.filter((move) => !isInCheck(applyMove(gs, move), gs.toMove));
};

export const getChecksForPiece = (gs: State, p: Piece): Cord[] => {
    const allyPositions = getPositionsByColor(gs, p.color);
    const enemyPositions = getPositionsByColor(gs, !p.color);
    let checks: Cord[];

    switch (typeof p) {
        case typeof Pawn: {
            if (p.color) {
                checks = [getUpRight(p.loc), getUpLeft(p.loc)];
            } else {
                checks = [getDownRight(p.loc), getDownLeft(p.loc)];
            }
            break;
        }
        case typeof Knight: {
            checks = [
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
            checks = [];
            let cur;

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getUpLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getUpRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getDownLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getDownRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            checks = checks.filter((loc) => loc.toString() != p.loc.toString());

            break;
        }
        case typeof Rook: {
            checks = [];
            let cur;

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getUp(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getDown(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            checks = checks.filter((loc) => loc.toString() != p.loc.toString());

            break;
        }
        case typeof Queen: {
            checks = [];
            let cur;

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getUpLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getUpRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getDownLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getDownRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getUp(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getDown(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getRight(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            cur = p.loc;
            do {
                checks.push(cur);
                cur = getLeft(cur);
            } while (
                isValid(cur) &&
                !enemyPositions.has(cur.toString()) &&
                !allyPositions.has(cur.toString())
            );

            checks = checks.filter((loc) => loc.toString() != p.loc.toString());

            break;
        }
        case typeof King: {
            checks = [
                getUp(p.loc),
                getLeft(p.loc),
                getRight(p.loc),
                getDown(p.loc),
                getDownRight(p.loc),
                getDownLeft(p.loc),
                getUpLeft(p.loc),
                getUpRight(p.loc),
            ];
            break;
        }
        default: {
            throw new Error("Invalid Piece Type");
        }
    }
    return checks.filter((loc) => isValid(loc));
};
