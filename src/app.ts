import * as http from "http";
import * as express from "express";
import { Router } from "express";
import taskRouter from "./lib/tasks/routes/task-router";
import * as bodyParser from "body-parser";
import userRouter from "./lib/user/routes/user-router";
import dealRouter from "./lib/deals/routes/deal-router";
import {errorLog, successLog} from "./lib/tools/logger-service";

export class Server {

    public app;
    private router;

    constructor() {
        this.app = express();
        this.router = Router();

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setRoutes();
    }

    private setRoutes() {
        this.app.use("/api/v1", this.router);
        this.router.use("/tasks", taskRouter);
        this.router.use("/users", userRouter);
        this.router.use("/deals", dealRouter);
    }
}

const server = new Server();

http.createServer(server.app).listen(8080, () => successLog.info("Server listening"));
