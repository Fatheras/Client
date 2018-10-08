import Sequelize from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const db = new Sequelize("task_project", "root", process.env.PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

export default db;
