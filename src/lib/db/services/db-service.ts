import db from "../models/db";
import { successLog, errorLog } from "../../tools/logger-service";

export default class DBService {
    public static async initDataBase() {
        try {
            await db.authenticate();
            await db.sync();

            successLog.info("Connected to database");
        } catch (err) {
            errorLog.error("Database is not found");
        }
    }
}
