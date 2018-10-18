import * as http from "http";
import { errorLog, successLog } from "./lib/tools/logger-service";
import AuthService from "./lib/authentication/services/auth-service";
import DBService from "./lib/db/services/db-service";
import app from "./lib/server/models/express-application";

const initApplication = async () => {

    try {
        await DBService.initDataBase();

        AuthService.setUpPassport();

        http.createServer(app).listen(process.env.PORT, () => successLog.info("Server listening"));
    } catch (error) {
        errorLog.error(error);
    }
};

initApplication();
