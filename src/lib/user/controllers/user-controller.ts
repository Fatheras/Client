import UserService from "../services/user-service";
import { IUser, User } from "../models/user";
import CustomError from "../../tools/error";
import { Request, Response } from "express";
import AuthService from "../../authentication/services/auth-service";
import StatisticService from "../services/statistic-service";

export class UserController {
    public static async changePassword(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        let user: IUser = await UserService.getUser(id);

        const isValid: boolean = await AuthService.isValidPassword(user.password, req.body.password);

        if (isValid) {
            const password: string = await AuthService.hashPassword(req.body.newPassword);
            user = await UserService.updateUser(id, { password } as IUser);

            if (user) {
                res.status(200).send(user);
            } else {
                throw new CustomError(400);
            }
        } else {
            throw new CustomError(400);
        }
    }

    public static async getAllUsers(req: Request, res: Response): Promise<void> {
        res.status(200).send(await UserService.getAllUsers());
    }

    public static async getUser(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        const user: IUser = await UserService.getUser(id);

        if (user) {
            res.status(200).send(user);
        } else {
            throw new CustomError(404);
        }
    }

    public static async getUserWithStatistic(req: Request, res: Response): Promise<void> {
        const id: number = +req.params.id;
        const user: IUser = await UserService.getUserWithStatistic(id);

        if (user) {
            res.status(200).send(user);
        } else {
            throw new CustomError(404);
        }
    }

    public static async addUser(req: Request, res: Response): Promise<void> {
        const model: IUser = req.body;
        const user: IUser = await UserService.addUser(model);

        if (user) {
            res.status(200).send(user);
        } else {
            throw new CustomError(400);
        }
    }

    public static async deleteUser(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        const result: number = await UserService.deleteUser(id);

        if (result) {
            res.sendStatus(200);
        } else {
            throw new CustomError(400);
        }
    }

    public static async updateUser(req: Request, res: Response): Promise<void> {
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
