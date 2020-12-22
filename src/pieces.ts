import { Piece } from "./model";

export class Pawn extends Piece {
    val = 1;
}

export class Knight extends Piece {
    val = 3;
}

export class Bishop extends Piece {
    val = 3;
}

export class Rook extends Piece {
    val = 5;
}

export class Queen extends Piece {
    val = 9;
}

export class King extends Piece {
    val = 3;
    // Obviously Kings can not be removed from the board and thus dont have real material value
    // - but this is their approximate power level and this value allows them to extend piece
}
