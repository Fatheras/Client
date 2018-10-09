"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../../db/models/db");
const user_1 = require("../../user/models/user");
exports.Task = db_1.default.define("task", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.default.STRING,
        validate: {
            notEmpty: true,
            len: [3, 30],
        },
    },
    cost: {
        type: sequelize_1.default.DOUBLE,
    },
    status: {
        type: sequelize_1.default.STRING,
        validate: {
            notEmpty: true,
            len: [4, 15],
        },
    },
    category: {
        type: sequelize_1.default.STRING,
    },
    countOfUsers: {
        type: sequelize_1.default.INTEGER,
    },
    time: {
        type: sequelize_1.default.TIME,
    },
    description: {
        type: sequelize_1.default.STRING,
    },
    owner: {
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
