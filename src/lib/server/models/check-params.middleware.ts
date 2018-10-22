import * as joi from "joi";
import {Requests} from "../enums/request-verb-enum";
import { Response, Request, NextFunction } from "express";

export default class CheckParamsMiddleware {
    public static getCollection(req: Request): string {
        switch (req.method) {
            case Requests.GET:
                return req.query;
            case Requests.DELETE:
            case Requests.POST:
            case Requests.PUT:
                return req.body;
            default:
                throw new Error("500");
        }
    }

    public static validateParamsJoi(schema: joi.Schema) {
        return (req: Request, res: Response, next: NextFunction) => {
            const collection: string  = CheckParamsMiddleware.getCollection(req);
            const result: joi.ValidationResult<string> = joi.validate(collection, schema);

            if (!result.error) {
                next();
            } else {
                res.status(400).send(result.error);
            }
        };
    }

    public static validateSequelizeEntity(entity: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const collection = CheckParamsMiddleware.getCollection(req);
            const model: any  = entity.build(req.body);

            try {
                await model.validate();
                next();
            } catch (error) {
                res.status(400).send(error);
            }
        };
    }
}
