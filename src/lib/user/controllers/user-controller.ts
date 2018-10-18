import UserService from "../services/user-service";
import { IUser } from "../models/user";
import CustomError from "../../tools/error";

export class UserController {

    public static async getAllUsers(req, res) {
        res.status(200).send(await UserService.getAllUsers());
    }

    public static async getUser(req, res) {

        const id: number = parseInt(req.params.id, 10);
        const user: IUser = await UserService.getUser(id);

        if (user) {
            res.status(200).send(user);
        } else {
            throw new CustomError(404);
        }

    }

    public static async addUser(req, res) {

        const model: IUser = req.body;
        const user: IUser = await UserService.addUser(model);

        if (user) {
            res.status(200).send(user);
        } else {
            throw new CustomError(400);
        }

    }

    public static async deleteUser(req, res) {

        const id: number = parseInt(req.params.id, 10);
        const result: number = await UserService.deleteUser(id);

        if (result) {
            res.sendStatus(204);
        } else {
            throw new CustomError(400);
        }

    }

    public static async updateUser(req, res) {

        const id: number = parseInt(req.params.id, 10);
        const model: IUser = req.body;
        const user: IUser = await UserService.updateUser(id, model);

        if (user) {
            res.status(200).send(user);
        } else {
            throw new CustomError(400);
        }
    }

}
