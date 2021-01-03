import { Cord, NotPromotions, Piece, PieceType, Promotions } from "./model";

export const buildPiece = (
    type: PieceType,
    loc: Cord,
    color: boolean,
): Piece => {
    switch (type) {
        case "p":
            return new Pawn(loc, color);
        case "r":
            return new Rook(loc, color);
        case "n":
            return new Knight(loc, color);
        case "b":
            return new Bishop(loc, color);
        case "q":
            return new Queen(loc, color);
        case "k":
            return new King(loc, color);
        default:
            throw new Error("Unrecognized Piece type");
    }
};

export class Pawn extends Piece {
    val = 1;
    type = NotPromotions.Pawn;
}

export class Knight extends Piece {
    val = 3;
    type = Promotions.Knight;
}

export class Bishop extends Piece {
    val = 3;
    type = Promotions.Bishop;
}

export class Rook extends Piece {
    val = 5;
    type = Promotions.Rook;
}

export class Queen extends Piece {
    val = 9;
    type = Promotions.Queen;
}

export class King extends Piece {
    val = 3;
    type = NotPromotions.King;
    // Obviously Kings can not be removed from the board and thus dont have real material value
    // - but this is their approximate power level and this value allows them to extend piece
}
