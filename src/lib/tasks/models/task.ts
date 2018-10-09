import Sequelize from "sequelize";
import db from "../../db/models/db";
import {User} from "../../user/models/user";

export interface ITask extends  Sequelize.Model<ITask>  {
    id?: number;
    name: string;
    cost: number;
    status: string;
    category: string;
    countOfUsers: number;
    time: string;
    description: string;
    owner: number;
}

export const Task = db.define<ITask>("task", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [3, 30],
        },
    },
    cost: {
        type: Sequelize.DOUBLE,
    },
    status: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
            len: [4, 15],
        },
    },
    category: {
        type: Sequelize.STRING,
    },
    countOfUsers: {
        type: Sequelize.INTEGER,
    },
    time: {
        type: Sequelize.TIME,
    },
    description: {
        type: Sequelize.STRING,
    },
    owner: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key:   "id",
        },
        validate: {notEmpty: true},
    },
},
{
    timestamps: false,
});
