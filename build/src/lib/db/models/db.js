"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const db = new sequelize_1.default(process.env.TABLE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.default = db;
