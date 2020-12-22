import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

import { tokenize } from "./src/io";
import { parse } from "./src/uci";

rl.on("line", (input: string) => {
    parse(tokenize(input));
});
