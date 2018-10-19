import * as winston from "winston";
import * as path from "path";

const fileSize: number = 1024000;

const Format = winston.format.printf((info) => {
    return `${info.timestamp} ${info.level} ${info.message}`;
});

class LoggerService {

    public log: any;

    constructor() {
        this.initLoggers();
    }

    public initLoggers() {
        this.log = this.getLogger();
    }

    public getLogger() {
        const logger = new (winston.transports.File)({
            filename: path.join("logs", "common", "server.log"),
            handleExceptions: true,
            maxsize: fileSize,
            format: winston.format.combine(
                winston.format.timestamp(),
                Format,
            ),
        });

        const res = winston.createLogger({
            transports: [
                new (winston.transports.Console)({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.timestamp(),
                        Format,
                    ),
                }),
                logger,
            ],
            exceptionHandlers: [
                logger,
            ],
        });

        return res;
    }

}

const loggerService = new LoggerService();

export const log = loggerService.log;
