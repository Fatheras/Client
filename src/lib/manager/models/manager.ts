import Sequelize from "sequelize";
import db from "../../db/models/db";
import { Category } from "../../categories/models/category";
import { User } from "../../user/models/user";

export interface IManager {
    id?: number;
    categoryId: number;
    userId: number;
}

export const Manager: Sequelize.Model<IManager, object> = db.define<IManager, object>("maneger", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    categoryId: {
        type: Sequelize.INTEGER,
        notEmpty: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        notEmpty: true,
    },

},
);

Manager.hasMany(Category, { foreignKey: "id" });
Category.belongsTo(Manager, { foreignKey: "categoryId" });

Manager.hasMany(User, { foreignKey: "id" });
User.belongsTo(Manager, { foreignKey: "userId" });
