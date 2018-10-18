import Sequelize from "sequelize";
import db from "../../db/models/db";
import * as bcrypt from "bcrypt";
import CustomError from "../../tools/error";

export interface IUser extends Sequelize.Model<IUser> {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone: string;
    email: string;
    password: string;
    role: number;
}

export const User = db.define<IUser>("user", {
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
    { timestamps: false });

User.beforeCreate((user: IUser, options) => {
    return bcrypt.hash(user.password, 10)
        .then((hash) => {
            user.password = hash;
        })
        .catch((err) => {
            throw new CustomError(500);
        });
});

User.isValidPassword = async (user: IUser, password: string) => {
    const foundUser = user;
    let compare: boolean;
    compare = await bcrypt.compare(password, foundUser.password);
    return compare;
};
