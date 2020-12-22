import * as readline from "readline";
import { Move } from "./model";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// TODO UNIT TEST
export const tokenize = (input: string): string[] =>
    input
        .split(" ")
        .map((str) => str.trim())
        .filter((str) => str != null && str.length);

export const sendId = (name: string, author: string): void => {
    process.stdout.write(`id name ${name}\n`);
    process.stdout.write(`id author ${author}\n`);
};

export const sendOptions = (): void => {
    // Currently No Options Exist
};

export const sendUciOk = (): void => {
    process.stdout.write("uciok\n");
};

export const sendReadyOk = (): void => {
    process.stdout.write("readyok\n");
};

export const sendBestMove = (move: Move): void => {
    process.stdout.write(`bestmove ${move.toString()}\n`);
};
