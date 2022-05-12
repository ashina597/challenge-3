"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controller/controller");
const router = express_1.default.Router();
router.post('/create', controller_1.createtodo);
router.patch('/:id', controller_1.completeTodo);
router.get('/', controller_1.getTodos);
router.get('/completedTodos', controller_1.getcompletedTodos);
router.get('/uncompletedTodos', controller_1.getuncompleteTodos);
router.put('/update', controller_1.updateTodos);
router.delete('/:id', controller_1.deleteTodos);
router.get('/:id', controller_1.getTodo);
exports.default = router;
