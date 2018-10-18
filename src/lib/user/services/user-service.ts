import { User, IUser } from "../../user/models/user";

export default class UserService {

    public static async getAllUsers() {
        return User.findAll();
    }

    public static async getUser(id: number) {
        return User.findById(id);
    }

    public static async addUser(user: IUser) {
        return User.create(user);
    }

    public static async deleteUser(id: number) {
        return User.destroy({
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

            return this.getUser(id);
        }
    }

}
