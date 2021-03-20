"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(res) {
        this.res = res;
        this.res = res;
    }
    success(resData) {
        this.res.send({
            message: 'OK',
            data: resData,
        });
    }
    error(statusCode, errorMessage, errors) {
        this.res.status(statusCode).send({
            message: errorMessage,
            errors,
        });
    }
}
exports.ApiResponse = ApiResponse;
