// TODO UNIT TEST
export const tokenize = (input: string): string[] =>
    input
        .split(" ")
        .map((str) => str.trim())
        .filter((str) => str != null && str.length);
