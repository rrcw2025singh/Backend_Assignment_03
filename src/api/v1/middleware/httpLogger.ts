import fs from "fs";
import path from "path";
import morgan from "morgan";

const logDirectory = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const httpLogStream = fs.createWriteStream(
    path.join(logDirectory, "http.log"),
    { flags: "a" }
);

export const httpLogger = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    {
        stream: httpLogStream
    }
);

export const consoleHttpLogger = morgan(
    ":method :url :status :res[content-length] - :response-time ms"
);