import bodyParser = require("body-parser");
import passport = require("passport");
import { Router } from "express";
import express = require("express");
import taskRouter from "../../tasks/routes/task-router";
import userRouter from "../../user/routes/user-router";
import dealRouter from "../../deals/routes/deal-router";
import { successLog, errorLog } from "../../tools/logger-service";
import CustomError from "../../tools/error";

export class Server {

    public app;
    private router;

    constructor() {
        try {
            this.app = express();
            this.router = Router();

            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(bodyParser.json());
            this.app.use(passport.initialize());
            this.app.use((req, res, next) => {
                res.header("Access-Control-Allow-Origin", "*");
                // tslint:disable-next-line:max-line-length
                res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
                next();
            });

            this.setRoutes();

            this.app.use((req, res, error: CustomError) => {
                switch (error.Code) {
                    case 400: {
                        res.sendStatus(400);
                    }
                    case 404: {
                        res.sendStatus(404);
                    }
                    case 500: {
                        res.sendStatus(500);
                    }
                }
            });
        } catch (error) {
            errorLog.error(error);
        }

    }

    private setRoutes() {
        this.app.use("/api/v1", this.router);
        this.router.use("/tasks", taskRouter);
        this.router.use("/users", userRouter);
        this.router.use("/deals", dealRouter);
        this.router.get("*", (req, res, next) => {
            next(new CustomError(404));
        });
    }
}

const server = new Server();

export default server.app;
