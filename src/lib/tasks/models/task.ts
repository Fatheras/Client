import Sequelize from "sequelize";
import db from "../../db/models/db";
import { User } from "../../user/models/user";

export interface ITask {
    id?: number;
    title: string;
    cost: number;
    status: number;
    category: string;
    time: string;
    description: string;
    owner: number;
    peoples: number;
    countOfDeals?: number;
}

export const Task: Sequelize.Model<ITask, object> = db.define<ITask, object>("task", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
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
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: true,
        },
    },
    category: {
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
            key: "id",
        },
        validate: { notEmpty: true },
    },
    peoples: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: true,
            len: [1, 5],
        },
    },
},
);
