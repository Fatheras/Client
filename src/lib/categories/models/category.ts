import Sequelize from "sequelize";
import db from "../../db/models/db";

export interface ICategory {
    id?: number;
    name: string;
    statistic?: ICategoryStatistic;
}

export interface ICategoryStatistic {
    count: number;
    open: number;
}

export const Category = db.define<ICategory, object>("category", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
        },
    },
},
    {
        timestamps: false,
    });
