import * as readline from "readline";
import { tokenize } from "./src/io";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (input: string) => {
    // TODO
    const tokens = tokenize(input);
});
