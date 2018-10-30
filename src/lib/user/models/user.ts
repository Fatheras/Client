import Sequelize from "sequelize";
import db from "../../db/models/db";
import * as bcrypt from "bcrypt";
import CustomError from "../../tools/error";
import { Task } from "../../tasks/models/task";
import { isBuffer } from "util";

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone: string;
    email: string;
    password: string;
    role: number;
    statistic?: IUserStatistic;
}

export interface IUserStatistic {
    approved: number;
    declined: number;
    opened: number;
    closed: number;
    [index: string]: number;
}

export const User: Sequelize.Model<IUser, object> = db.define<IUser, object>("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        validate: {
            len: [3, 20],
        },
    },
    lastName: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [4, 15],
        },
    },
    email: {
        type: Sequelize.STRING,
        notEmpty: true,
    },
    password: {
        type: Sequelize.STRING,
        notEmpty: true,
    },
    role: {
        type: Sequelize.INTEGER,
        notEmpty: true,
    },
},
    { timestamps: false },
);

User.hasMany(Task, { foreignKey: "owner" });
Task.belongsTo(User, { foreignKey: "owner" });
