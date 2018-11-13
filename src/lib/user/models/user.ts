import Sequelize from "sequelize";
import db from "../../db/models/db";

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email: string;
    password: string;
    role: number;
    statistic?: IUserStatistic;
}

export interface IUserStatistic {
    onReview: number;
    open: number;
    pending: number;
    done: number;
    declined: number;
    count: number;
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
);

// User.hasMany(Task, { foreignKey: "owner" });
// Task.belongsTo(User, { foreignKey: "id" });
