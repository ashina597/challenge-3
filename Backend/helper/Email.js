"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function createTransporter(config) {
    let transporter = nodemailer_1.default.createTransport(config);
    return transporter;
}
const configuration = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
};
const sendMail = async (mailoptions) => {
    const transporter = createTransporter(configuration);
    await transporter.verify;
    await transporter.sendMail(mailoptions);
};
exports.default = sendMail;
