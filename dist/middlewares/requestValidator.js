"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const ApiResponse_1 = require("../lib/ApiResponse");
const validate = (schema) => {
    return (req, res, next) => {
        const data = {};
        if (req.body && Object.keys(req.body).length > 0) {
            data.body = req.body;
        }
        if (req.params && Object.keys(req.params).length > 0) {
            data.params = req.params;
        }
        if (req.query && Object.keys(req.query).length > 0) {
            data.query = req.query;
        }
        const { error } = schema.validate(data);
        const valid = error == null;
        // const { error } = joiValidate(data, schema, { allowUnknown: true })
        // const valid = error == null
        if (valid) {
            next();
        }
        else {
            const { details } = error;
            const message = details.map((detail) => {
                return {
                    message: detail.message,
                    type: detail.type,
                    path: detail.path[0],
                    property: detail.context.key,
                };
            });
            return new ApiResponse_1.ApiResponse(res).error(422, "VALIDATION_ERROR", message);
        }
    };
};
exports.validate = validate;
