import * as winston from "winston";
import * as path from "path";

const fileSize: number = 1024000;

const Format = winston.format.printf((info) => {
    return `${info.timestamp} ${info.level} ${info.message}`;
});

class LoggerService {

    public successLog: winston.Logger;

    public errorLog: winston.Logger;

    constructor() {
        this.initLoggers();
    }

    public initLoggers() {
        this.successLog = this.getSuccessLogger();
        this.errorLog = this.getErrorLogger();
    }

    public getErrorLogger() {
        const errLogger = new (winston.transports.File)({
            level: "error",
            filename: path.join("logs", "common", "err.log"),
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
                errLogger,
            ],
            exceptionHandlers: [
                errLogger,
            ],
        });

        return res;
    }

    public getSuccessLogger() {
        const successLogger = new (winston.transports.File)({
            level: "info",
            filename: path.join("logs", "common", "success.log"),
            handleExceptions: false,
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
                successLogger,
            ],
        });

        return res;
    }

}

const loggerService = new LoggerService();

export const successLog = loggerService.successLog;
export const errorLog = loggerService.errorLog;
