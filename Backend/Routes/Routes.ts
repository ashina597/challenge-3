import express from "express";
import { createtodo, getTodos, getuncompleteTodos, updateTodos, deleteTodos, 
    getcompletedTodos, completeTodo, getTodo } from "../controller/controller";

const router = express.Router()


router.post('/create', createtodo)
router.patch('/:id', completeTodo)
router.get('/', getTodos)
router.get('/completedTodos', getcompletedTodos)
router.get('/uncompletedTodos', getuncompleteTodos)
router.put('/update', updateTodos)
router.delete('/:id', deleteTodos)
router.get('/:id', getTodo)

export default router;