import {
    sendBestMove,
    sendId,
    sendOptions,
    sendReadyOk,
    sendUciOk,
} from "./io";
import { lock } from "./lock";
import { Result, search } from "./search";

enum uciRequest {
    uci = "uci",
    debug = "debug",
    isready = "isready",
    setoption = "setoption",
    register = "register",
    ucinewgame = "ucinewgame",
    position = "position",
    go = "go",
    stop = "stop",
    ponderhit = "ponderhit",
    quit = "quit",
}

export const parse = (tokens: string[]): void => {
    tokens.forEach((token, i, tokens) => {
        switch (token as uciRequest) {
            case uciRequest.debug: {
                // Not supported
                return;
            }
            case uciRequest.go: {
                return handleGo(tokens.slice(i + 1));
            }
            case uciRequest.isready: {
                return handleIsReady();
            }
            case uciRequest.ponderhit: {
                // Not Supported
                return;
            }
            case uciRequest.position: {
                return handlePosition(tokens.slice(i + 1));
            }
            case uciRequest.quit: {
                process.exit();
            }
            case uciRequest.register: {
                // Not supported
                return;
            }
            case uciRequest.setoption: {
                // Currently no options exist
                return;
            }
            case uciRequest.stop: {
                return handleStop();
            }
            case uciRequest.uci: {
                return handleUci();
            }
            case uciRequest.ucinewgame: {
                return handleUciNewGame();
            }
            default: {
                // As per UCI documentation ignore unrecognized tokens
                break;
            }
        }
    });
};

const handleUci = () => {
    sendId("materialist-uci", "Colin Topper");
    sendOptions();
    sendUciOk();
};

const handleIsReady = () => {
    // Currently no intialization needs to be done so just send readyok
    // TODO verify this works with ucinewgame
    sendReadyOk();
};

const handleStop = () => {
    lock.go = false;
};

enum positionRequest {
    fen = "fen",
    startpos = "startpos",
    moves = "moves",
}

const handlePosition = (args: string[]): void => {
    // TODO
};

enum goRequest {
    searchmoves = "searchmoves",
    ponder = "ponder",
    wtime = "wtime",
    btime = "btime",
    winc = "winc",
    binc = "binc",
    movestogo = "movestogo",
    depth = "depth",
    nodes = "nodes",
    mate = "mate",
    movetime = "movetime",
    infinite = "infinite",
}

const handleGo = (args: string[]): void => {
    // TODO Handle arguments to the go command
    search(lock.root).then((result: Result) => sendBestMove(result.bestmove));
};

const handleUciNewGame = (): void => {
    lock.reset();
};
