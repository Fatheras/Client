import Sequelize from "sequelize";
import db from "../../db/models/db";
import { User, IUser } from "../../user/models/user";
import { ICategory } from "../../categories/models/category";

export interface ITask {
    id?: number;
    title: string;
    cost: number;
    status: number;
    categoryId: number;
    category?: ICategory;
    time: string;
    description: string;
    ownerId: number;
    people: number;
    countOfDeals?: number;
}

interface ITaskUser extends ITask {
    user: IUser;
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
    categoryId: {
        type: Sequelize.INTEGER,
    },
    time: {
        type: Sequelize.TIME,
    },
    description: {
        type: Sequelize.STRING,
    },
    ownerId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        validate: { notEmpty: true },
    },
    people: {
        type: Sequelize.INTEGER,
        validate: {
            notEmpty: true,
            len: [1, 5],
        },
    },
},
);

Task.belongsTo(User, { foreignKey: "ownerId" });
User.hasMany(Task, { foreignKey: "ownerId" });
