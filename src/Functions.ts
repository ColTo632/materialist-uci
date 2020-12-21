import { Cord, State } from "./model";

export const getPositions = (gs: State): Set<Cord> =>
    new Set(gs.pieces.map((p) => p.loc));
