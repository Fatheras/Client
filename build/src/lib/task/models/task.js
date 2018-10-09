"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../../db/models/db");
const User = db_1.default.define('user', {
    name: {
        type: sequelize_1.default.STRING,
        validate: {
            notEmpty: true,
            len: [3, 30],
        }
    },
    cost: {
        type: sequelize_1.default.INTEGER,
    },
    status: {
        type: sequelize_1.default.STRING,
        validate: {
            notEmpty: true,
            len: [4, 15],
        }
    },
    category: {
        type: sequelize_1.default.STRING,
    },
    time: {
        type: sequelize_1.default.TIME,
    },
    description: {
        type: sequelize_1.default.STRING,
    },
    owner: {
        type: sequelize_1.default.INTEGER,
    },
});
exports.default = User;
//# sourceMappingURL=task.js.map