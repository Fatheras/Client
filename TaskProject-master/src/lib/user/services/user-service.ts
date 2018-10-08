import {User, IUser} from "../../user/models/user";

export default class UserService {

    public static async getAllUsers() {
        return await User.findAll();
    }

    public static async getUser(id: number) {
        return await User.findById(id);
    }

    public static async addUser(user: IUser) {
        return await User.create(user);
    }

    public static async deleteUser(id: number) {
        return await User.destroy({
            where: {
                id,
            },
        });
    }

    public static async updateUser(id: number, model: IUser) {
        if (model) {
            delete model.id;

            await User.update(model, {
                where: {
                    id,
                },
            });

            return await this.getUser(id);
        }
    }

}
