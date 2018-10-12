"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../../db/models/db");
const bcrypt = require("bcrypt");
exports.User = db_1.default.define("user", {
    id: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.default.STRING,
        validate: {
            len: [3, 20],
        },
    },
    lastName: {
        type: sequelize_1.default.STRING,
    },
    phone: {
        type: sequelize_1.default.STRING,
        validate: {
            notEmpty: true,
            len: [4, 15],
        },
    },
    email: {
        type: sequelize_1.default.STRING,
        notEmpty: true,
    },
    password: {
        type: sequelize_1.default.STRING,
        notEmpty: true,
    },
}, { timestamps: false });
exports.User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
        .then((hash) => {
        user.password = hash;
    })
        .catch((err) => {
        throw new Error();
    });
});
exports.User.isValidPassword = (user, password) => __awaiter(this, void 0, void 0, function* () {
    const foundUser = user;
    let compare;
    compare = yield bcrypt.compare(password, foundUser.password);
    return compare;
});
