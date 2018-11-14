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
            notEmpty: true,
            references: {
                model: Category,
                key: "id",
            },
        },
        userId: {
            type: Sequelize.INTEGER,
            notEmpty: true,
            references: {
                model: User,
                key: "id",
            },
        },

    },
        { timestamps: false },
    );

CategoryManager.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(CategoryManager);
