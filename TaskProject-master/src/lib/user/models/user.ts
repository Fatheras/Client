import Sequelize from "sequelize";
import db from "../../db/models/db";

export interface IUser extends Sequelize.Model<IUser> {
    id?: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

export const User = db.define<IUser>("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true,
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
    },
},
{ timestamps: false });
