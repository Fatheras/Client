"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../../db/models/db");
const user_1 = require("../../user/models/user");
exports.Deal = db_1.default.define("deal", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: user_1.User,
            key: "id",
        },
        validate: { notEmpty: true },
    },
    taskId: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: user_1.User,
            key: "id",
        },
        validate: { notEmpty: true },
    },
}, {
    timestamps: false,
});
