"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const path = require("path");
const fileSize = 1024000;
const Format = winston.format.printf((info) => {
    return `${info.timestamp} ${info.level} ${info.message}`;
});
class LoggerService {
    constructor() {
        this.initLoggers();
    }
    initLoggers() {
        this.successLog = this.getSuccessLogger();
        this.errorLog = this.getErrorLogger();
    }
    getErrorLogger() {
        const errLogger = new (winston.transports.File)({
            level: "error",
            filename: path.join("logs", "common", "err.log"),
            handleExceptions: true,
            maxsize: fileSize,
            format: winston.format.combine(winston.format.timestamp(), Format),
        });
        const res = winston.createLogger({
            transports: [
                new (winston.transports.Console)({
                    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), Format),
                }),
                errLogger,
            ],
            exceptionHandlers: [
                errLogger,
            ],
        });
        return res;
    }
    getSuccessLogger() {
        const successLogger = new (winston.transports.File)({
            level: "info",
            filename: path.join("logs", "common", "success.log"),
            handleExceptions: false,
            maxsize: fileSize,
            format: winston.format.combine(winston.format.timestamp(), Format),
        });
        const res = winston.createLogger({
            transports: [
                new (winston.transports.Console)({
                    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), Format),
                }),
                successLogger,
            ],
        });
        return res;
    }
}
const loggerService = new LoggerService();
exports.successLog = loggerService.successLog;
exports.errorLog = loggerService.errorLog;
