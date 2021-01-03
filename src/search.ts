import { getMoves } from "./functions/moves";
import { Move, State } from "./model";

// Currently makes a random legal move
export const search = async (gs: State): Promise<Result> => {
    const moves = getMoves(gs);
    const bestmove = moves[~~(Math.random() * moves.length)];

    return {
        bestmove: bestmove,
        alpha: 0,
        beta: 0,
        depth: 0,
    };
};

export interface Result {
    bestmove: Move;

    alpha: number;
    beta: number;
    depth: number;
}
