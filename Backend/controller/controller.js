"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodo = exports.deleteTodos = exports.updateTodos = exports.getuncompleteTodos = exports.getcompletedTodos = exports.getTodos = exports.completeTodo = exports.createtodo = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const create_emailservice_1 = __importDefault(require("../Email_service/create_emailservice"));
const complete_emailservice_1 = __importDefault(require("../Email_service/complete_emailservice"));
const Todos = [];
//create a task
const createtodo = async (req, res) => {
    try {
        const id = (0, uuid_1.v1)();
        const { title, description, completionDate, status, assignedTo } = req.body;
        let pool = await mssql_1.default.connect(config_1.default);
        await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('title', mssql_1.default.VarChar, title)
            .input('description', mssql_1.default.VarChar, description)
            .input('date', mssql_1.default.Date, completionDate)
            .input('status', mssql_1.default.VarChar(50), status)
            .input('assignedTo', mssql_1.default.VarChar(100), assignedTo)
            .execute('createtask');
        res.status(200).json({ message: 'Task Created Successfully' });
        try {
            (0, create_emailservice_1.default)(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.createtodo = createtodo;
//complete a task
const completeTodo = async (req, res, next) => {
    try {
        const { id, submission } = req.body;
        let pool = await mssql_1.default.connect(config_1.default);
        const check = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('gettask');
        if (!check.recordset[0]) {
            res.json({ message: 'task with id ${id }does not exist' });
        }
        const task = await pool.request()
            .input('id', mssql_1.default.VarChar(100), id)
            .input('submission', mssql_1.default.VarChar(100), submission)
            .execute('completetask');
        res.json("task completed");
        console.log();
        try {
            (0, complete_emailservice_1.default)(id);
        }
        catch (error) {
            console.log(error);
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.completeTodo = completeTodo;
//get all tasks
const getTodos = async (req, res, next) => {
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        const task = await pool.request().execute('gettasks');
        res.json(task.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getTodos = getTodos;
//get completed tasks
const getcompletedTodos = async (req, res, next) => {
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        const task = await pool.request().execute('getcompleted');
        res.json(task.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getcompletedTodos = getcompletedTodos;
//get uncompleted tasks
const getuncompleteTodos = async (req, res, next) => {
    try {
        let pool = await mssql_1.default.connect(config_1.default);
        const task = await pool.request().execute('getuncompleted');
        res.json(task.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getuncompleteTodos = getuncompleteTodos;
//update task
const updateTodos = async (req, res) => {
    try {
        const { id, completionDate, title, description, status, assignedTo } = req.body;
        let pool = await mssql_1.default.connect(config_1.default);
        const check = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('gettask');
        if (!check.recordset[0]) {
            res.json({ message: 'task with id ${id }does not exist' });
        }
        const task = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('date', mssql_1.default.Date, completionDate)
            .input('title', mssql_1.default.VarChar(50), title)
            .input('description', mssql_1.default.VarChar(50), description)
            .input('assignedTo', mssql_1.default.VarChar(100), assignedTo)
            .execute('updatetask');
        res.json("tasks updated successfully");
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.updateTodos = updateTodos;
//delete task
const deleteTodos = async (req, res) => {
    try {
        const id = req.params.id;
        let pool = await mssql_1.default.connect(config_1.default);
        const check = await pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .execute('gettask');
        if (!check.recordset[0]) {
            res.json({ message: 'task with id ${id }does not exist' });
        }
        const task = await pool.request()
            .input('id', mssql_1.default.VarChar(100), id)
            .execute('deletetask');
        res.json({ message: 'User Deleted Successfully' });
    }
    catch (error) {
        res.json({ error: error.message
        });
    }
};
exports.deleteTodos = deleteTodos;
// get a task
const getTodo = async (req, res) => {
    try {
        const id = req.params.id;
        let pool = await mssql_1.default.connect(config_1.default);
        const task = await pool.request()
            .input('id', mssql_1.default.VarChar(100), id)
            .execute('gettask');
        res.json(task.recordset);
    }
    catch (error) {
        res.json({ error: error.message });
    }
};
exports.getTodo = getTodo;
