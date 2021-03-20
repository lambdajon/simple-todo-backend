"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmail(mailOptions) {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASSWORD}`,
            },
        });
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
    }
    catch (e) {
        throw new Error(`Send Email Error: ${e}`);
    }
}
exports.default = sendEmail;
