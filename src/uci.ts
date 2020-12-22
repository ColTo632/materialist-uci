export enum uciRequest {
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
                // TODO
                break;
            }
            case uciRequest.go: {
                // TODO
                break;
            }
            case uciRequest.isready: {
                // TODO
                break;
            }
            case uciRequest.ponderhit: {
                // TODO
                break;
            }
            case uciRequest.position: {
                // TODO
                break;
            }
            case uciRequest.quit: {
                process.exit();
            }
            case uciRequest.register: {
                // TODO
                break;
            }
            case uciRequest.setoption: {
                // TODO
                break;
            }
            case uciRequest.stop: {
                // TODO
                break;
            }
            case uciRequest.uci: {
                handleUci();
                return;
            }
            case uciRequest.ucinewgame: {
                // TODO
                break;
            }
            default: {
                // As per UCI documentation ignore unrecognized tokens
                break;
            }
        }
    });
};

const handleUci = () => {
    sendId();
    sendOptions();
    sendUciOk();
};

const sendId = () => {
    process.stdout.write("id name materialist-uci\n");
    process.stdout.write("id author Colin Topper\n");
};

const sendOptions = () => {
    //TODO
};

const sendUciOk = () => {
    process.stdout.write("uciok\n");
};
