import Sequelize from "sequelize";
import db from "../../db/models/db";
import { Category } from "../../categories/models/category";

export interface ICategoryManager {
    id?: number;
    categoryId: number;
    userId: number;
}

export const CategoryManager: Sequelize.Model<ICategoryManager, object> =
    db.define<ICategoryManager, object>("category_manager", {
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
        { timestamps: false },
    );

CategoryManager.hasMany(Category, { foreignKey: "id" });
Category.belongsTo(CategoryManager, { foreignKey: "categoryId" });
