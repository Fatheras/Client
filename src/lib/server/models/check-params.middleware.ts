import * as joi from "joi";
import {Requests} from "../enums/request-verb-enum";
import { Response, Request, NextFunction } from "express";

export default class CheckParamsMiddleware {
    public static getCollectionName(req: Request): string {
        switch (req.method) {
            case Requests.GET:
                return "query";
            case Requests.DELETE:
            case Requests.POST:
            case Requests.PUT:
                return "body";
            default:
                throw new Error("500");
        }
    }

    public static validateParamsJoi(schema: joi.Schema) {
        return (req: Request, res: Response, next: NextFunction) => {
            const collectionName: string  = CheckParamsMiddleware.getCollectionName(req);
            let result: joi.ValidationResult<any>;

            if (collectionName === "body") {
                result = joi.validate(req.body, schema);
            } else {
                result = joi.validate(req.query, schema);
            }

            if (!result.error) {
                next();
            } else {
                res.status(400).send(result.error);
            }
        };
    }

    public static validateSequelizeEntity(entity: any) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const collectionName = CheckParamsMiddleware.getCollectionName(req);
            let model: any;

            if (collectionName === "body") {
                model = entity.build(req.body);
            } else {
                model = entity.build(req.query);
            }

            try {
                await model.validate();
                next();
            } catch (error) {
                res.status(400).send(error);
            }
        };
    }
}
