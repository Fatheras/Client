import * as joi from "joi";
import {Requests} from "../enums/request-verb-enum";

export default class CheckParamsMiddleware {
    public static getCollectionName(req) {
        switch (req.method) {
            case Requests.GET:
                return "query";
            case Requests.DELETE:
            case Requests.POST:
            case Requests.PUT:
                return "body";
        }
    }

    public static validateParamsJoi(schema) {
        return (req, res, next) => {
            const collectionName = CheckParamsMiddleware.getCollectionName(req);
            const result = joi.validate(req[collectionName], schema);
            if (!result.error) {
                next();
            } else {
                res.status(400).send(result.error);
            }
        };
    }

    public static validateSequelizeEntity(entity) {
        return async (req, res, next) => {
            const collectionName = CheckParamsMiddleware.getCollectionName(req);
            const model = entity.build(req[collectionName]);
            try {
                await model.validate();
                next();
            } catch (error) {
                res.status(400).send(error);
            }
        };
    }
}
