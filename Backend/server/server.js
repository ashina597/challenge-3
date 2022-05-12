"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Routes_1 = __importDefault(require("./Routes/Routes"));
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("./config/config"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/Todo', Routes_1.default);
app.listen(7000, () => {
    console.log("listening to port 7000");
});
const checkConnection = async () => {
    await mssql_1.default.connect(config_1.default).then(x => {
        if (x.connected) {
            console.log('Database Connected');
        }
    }).catch(err => {
        console.log(err.message);
    });
};
checkConnection();
