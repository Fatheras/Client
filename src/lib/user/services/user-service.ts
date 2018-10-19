import { User, IUser } from "../../user/models/user";
import CustomError from "../../tools/error";

export default class UserService {

    public static async getAllUsers(): Promise<IUser[]> {
        return User.findAll();
    }

    public static async getUser(id: number): Promise<IUser> {
        const user: IUser | null = await User.findById(id);

        if (user) {
            return user;
        } else {
            throw new CustomError(400);
        }

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

    public static async updateUser(id: number, model: IUser): Promise<IUser> {
        if (model) {
            delete model.id;

            await User.update(model, {
                where: {
                    id,
                },
            });

            return this.getUser(id);
        } else {
            throw new CustomError(400);
        }
    }

}
