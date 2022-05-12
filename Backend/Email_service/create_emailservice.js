"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Email_1 = __importDefault(require("../helper/Email"));
const ejs_1 = __importDefault(require("ejs"));
const dotenv_1 = __importDefault(require("dotenv"));
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
dotenv_1.default.config();
const create_emailservice = async (id) => {
    const pool = await mssql_1.default.connect(config_1.default);
    const task = await pool.request()
        .input('id', mssql_1.default.VarChar(100), id)
        .execute('gettask');
    const data = task.recordset;
    data.map((item) => {
        ejs_1.default.renderFile('./template/create.ejs', { title: item.title, description: item.descriptions, date: item.completionDate }, async (error, data) => {
            const mailoptions = {
                from: process.env.EMAIL,
                to: item.assignedTo,
                subject: 'Task Assignment',
                html: data
            };
            try {
                await (0, Email_1.default)(mailoptions);
                console.log("success");
            }
            catch (error) {
                console.log(error);
            }
        });
    });
};
exports.default = create_emailservice;
