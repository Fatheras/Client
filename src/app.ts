import * as http from "http";
import * as express from "express";
import { Router } from "express";
import * as bodyParser from "body-parser";
import { errorLog, successLog } from "./lib/tools/logger-service";
import passport = require("passport");
import AuthService from "./lib/authentication/auth-service";
import DBService from "./lib/db/services/db-service";
import app from "./lib/server/models/express-application";

const initApplication = async () => {

    try {
        await DBService.initDataBase();

        AuthService.signUp();
        AuthService.logIn();
        AuthService.checkAccess();

        http.createServer(app).listen(process.env.PORT, () => successLog.info("Server listening"));
    } catch (error) {
        errorLog.error(error);
    }
};

initApplication();
