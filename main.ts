import { rl, tokenize } from "./src/io";
import { parse } from "./src/uci";

rl.on("line", (input: string) => {
    parse(tokenize(input));
});
