"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function verifyEmail() {
    let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 10; i++) {
        let index = Math.floor(Math.random() * 62) + 1;
        result = result + str[index];
    }
    return result;
}
exports.default = verifyEmail;
