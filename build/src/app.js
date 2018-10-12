"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const express = require("express");
const express_1 = require("express");
const task_router_1 = require("./lib/tasks/routes/task-router");
const bodyParser = require("body-parser");
const user_router_1 = require("./lib/user/routes/user-router");
const deal_router_1 = require("./lib/deals/routes/deal-router");
const logger_service_1 = require("./lib/tools/logger-service");
const passport = require("passport");
const auth_service_1 = require("./lib/authentication/auth-service");
class Server {
    constructor() {
        try {
            this.app = express();
            this.router = express_1.Router();
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
            auth_service_1.default.signUp();
            auth_service_1.default.logIn();
            auth_service_1.default.checkAccess();
            this.setRoutes();
        }
        catch (error) {
            logger_service_1.successLog.info(error);
        }
    }
    setRoutes() {
        this.app.use("/api/v1", this.router);
        this.router.use("/tasks", task_router_1.default);
        this.router.use("/users", user_router_1.default);
        this.router.use("/deals", deal_router_1.default);
    }
}
exports.Server = Server;
const server = new Server();
http.createServer(server.app).listen(process.env.PORT, () => logger_service_1.successLog.info("Server listening"));
