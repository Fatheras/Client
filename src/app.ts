import http from "http";
import { log } from "./lib/tools/logger-service";
import AuthService from "./lib/authentication/services/auth-service";
import DBService from "./lib/db/services/db-service";
import app from "./lib/server/models/express-application";

const initApplication = async () => {
    try {
        await DBService.initDataBase();

        AuthService.setUpPassport();

        http.createServer(app).listen(process.env.PORT, () => log.info("Server listening"));
    } catch (error) {
        log.error(error);
        log.error((error as Error).message);
    }
};

initApplication();
