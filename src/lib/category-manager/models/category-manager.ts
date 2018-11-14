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
    db.define<ICategoryManager, object>("category_manager", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        categoryId: {
            type: Sequelize.INTEGER,
            references: {
                model: Category,
                key: "id",
            },
            notEmpty: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            references: {
                model: User,
                key: "id",
            },
            notEmpty: true,
        },

    },
        { timestamps: false },
    );

CategoryManager.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(CategoryManager);
