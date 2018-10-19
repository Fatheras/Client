import * as path from "path";
import * as appRoot from "app-root-path";
import * as fs from "fs";
import morgan from "morgan";

const requestLogStream = fs.createWriteStream(path.join(appRoot.path,
    "logs", "common", "requests.log"), { flags: "a" });

export const morganSetUp = () => {
    return morgan(":date :status :method :url :response-time", { stream: requestLogStream });
};
