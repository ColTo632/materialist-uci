import { Cord } from "../model";

export const getRight = (loc: Cord): Cord =>
    new Cord(undefined, loc.x + 1, loc.y);
export const getLeft = (loc: Cord): Cord =>
    new Cord(undefined, loc.x - 1, loc.y);
export const getUp = (loc: Cord): Cord => new Cord(undefined, loc.x, loc.y + 1);
export const getDown = (loc: Cord): Cord =>
    new Cord(undefined, loc.x, loc.y - 1);

export const getUpUp = (loc: Cord): Cord =>
    new Cord(undefined, loc.x, loc.y + 2);

export const getDownDown = (loc: Cord): Cord =>
    new Cord(undefined, loc.x, loc.y - 2);

export const getUpRight = (loc: Cord): Cord =>
    new Cord(undefined, loc.x + 1, loc.y + 1);
export const getUpLeft = (loc: Cord): Cord =>
    new Cord(undefined, loc.x - 1, loc.y + 1);
export const getDownRight = (loc: Cord): Cord =>
    new Cord(undefined, loc.x + 1, loc.y - 1);
export const getDownLeft = (loc: Cord): Cord =>
    new Cord(undefined, loc.x - 1, loc.y - 1);

export const getUpUpRight = (loc: Cord): Cord =>
    new Cord(undefined, loc.x + 1, loc.y + 2);
export const getUpUpLeft = (loc: Cord): Cord =>
    new Cord(undefined, loc.x - 1, loc.y + 2);
export const getRightRightUp = (loc: Cord): Cord =>
    new Cord(undefined, loc.x + 2, loc.y + 1);
export const getRightRightDown = (loc: Cord): Cord =>
    new Cord(undefined, loc.x + 2, loc.y - 1);
export const getDownDownRight = (loc: Cord): Cord =>
    new Cord(undefined, loc.x + 1, loc.y - 2);
export const getDownDownLeft = (loc: Cord): Cord =>
    new Cord(undefined, loc.x - 1, loc.y - 2);
export const getLeftLeftUp = (loc: Cord): Cord =>
    new Cord(undefined, loc.x - 2, loc.y + 1);
export const getLeftLeftDown = (loc: Cord): Cord =>
    new Cord(undefined, loc.x - 2, loc.y - 1);
