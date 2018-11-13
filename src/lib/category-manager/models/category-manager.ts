import Sequelize from "sequelize";
import db from "../../db/models/db";
import { Category } from "../../categories/models/category";
import { User } from "../../user/models/user";

export interface ICategoryManager {
    id?: number;
    categoryId: number;
    userId: number;
}

export const CategoryManager: Sequelize.Model<ICategoryManager, object> =
    db.define<ICategoryManager, object>("maneger", {
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

CategoryManager.hasMany(Category, { foreignKey: "id" });
Category.belongsTo(CategoryManager, { foreignKey: "categoryId" });

CategoryManager.hasMany(User, { foreignKey: "id" });
User.belongsTo(CategoryManager, { foreignKey: "userId" });
