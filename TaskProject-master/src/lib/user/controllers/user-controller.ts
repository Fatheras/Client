import UserService from "../services/user-service";
import { IUser } from "../models/user";

export class UserController {

    public static async getAllUsers(req, res) {
        res.status(200).send(await UserService.getAllUsers());
    }

    public static async getUser(req, res) {
        let user: IUser;

        try {
            user = await UserService.getUser(req.params.id);

            if (user) {
                res.status(200).send(user);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.sendStatus(400);
        }
    }

    public static async addUser(req, res) {
        let user: IUser;

        try {
            user = await UserService.addUser(req.body);

            res.status(200).send(user);
        } catch (error) {
            res.send(error.message);
        }
    }

    public static async deleteUser(req, res) {
        let result: number;

        try {
            result = await UserService.deleteUser(req.params.id);

            if (result) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.sendStatus(400);
        }

    }

    public static async updateUser(req, res) {
        const userId = parseInt(req.params.id, 10);
        const model: IUser = req.body;
        let user: IUser;

        try {
            user = await UserService.updateUser(userId, model);

            if (user) {
                res.status(200).send(user);
            } else {
                res.sendStatus(404);
            }

        } catch (error) {
            res.sendStatus(400);
        }
    }

}
