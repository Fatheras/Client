import UserService from "../services/user-service";
import { IUser, User } from "../models/user";
import CustomError from "../../tools/error";
import { Request, Response } from "express";
import AuthService from "../../authentication/services/auth-service";

export class UserController {
    // public static async changePassword(req: Request, res: Response): Promise<void> {
    //     const id: number = parseInt(req.params.id, 10);
    //     let user: IUser = await UserService.getUser(id);

    //     const isValid: boolean = await AuthService.isValidPassword(user.password, req.body.password);

    //     if (isValid) {
    //         const password: string = await AuthService.hashPassword(req.body.newPassword);
    //         user = await UserService.updateUser(id, { password } as IUser);

    //         if (user) {
    //             res.status(200).send(user);
    //         } else {
    //             throw new CustomError(400);
    //         }
    //     } else {
    //         throw new CustomError(400);
    //     }
    // }

    public static async updateUser(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.body.id, 10);
        const user: IUser = await UserService.getUser(id);
        const model: IUser = req.body.user;
        if (req.body.password && req.body.newPassword) {
            const isValid: boolean = await AuthService.isValidPassword(user.password, req.body.password);
            if (isValid) {
                model.password = await AuthService.hashPassword(req.body.newPassword);
            } else {
                throw new CustomError(400);
            }
        }

        const updatedUser: IUser = await UserService.updateUser(id, model);

        if (updatedUser) {
            res.status(200).send(updatedUser);
        } else {
            throw new CustomError(400);
        }
    }

    public static async updateUserRole(req: Request, res: Response): Promise<void> {
        const id: number = parseInt(req.params.id, 10);
        const role: number = parseInt(req.body.role, 10);
        const updatedUser: IUser = await UserService.updateUserRole(id, role);

        if (updatedUser) {
            res.status(200).send(200);
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

    public static async getUserByToken(req: Request, res: Response): Promise<void> {
        const user: any = await UserService.getUserByToken(req.query.token);

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

    public static async getAllUsersWithStatistic(req: Request, res: Response): Promise<void> {
        const users: IUser[] = await UserService.getAllUsers();
        const usersWithStatictics: IUser[] = [];

        for (const user of users) {
            usersWithStatictics.push(await UserService.getUserWithStatistic(user.id!));
        }

        if (usersWithStatictics) {
            res.status(200).send(usersWithStatictics);
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
            res.status(200).send(200);
        } else {
            throw new CustomError(400);
        }
    }

    // public static async updateUser(req: Request, res: Response): Promise<void> {
    //     const id: number = parseInt(req.params.id, 10);
    //     const model: IUser = req.body;
    //     const user: IUser = await UserService.updateUser(id, model);

    //     if (user) {
    //         res.status(200).send(user);
    //     } else {
    //         throw new CustomError(400);
    //     }
    // }
}
