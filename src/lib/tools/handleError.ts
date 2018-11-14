import { Request, Response, NextFunction } from "express";

export const handleError = (func: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await func(req, res, next);
    } catch (error) {
        throw new Error(error);
    }
};
