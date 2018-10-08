import Sequelize from "sequelize";
import db from "../../db/models/db";
import {User} from "../../user/models/user";

export interface IDeal extends  Sequelize.Model<IDeal>  {
    id?: number;
    userId: number;
    taskId: number;
}

export const Deal = db.define<IDeal>("deal", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: "id",
        },
        validate: {notEmpty: true},
    },
    taskId: {
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
