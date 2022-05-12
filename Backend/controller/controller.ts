import Todo from "../Model/Todo";
import {v1 as uid} from 'uuid'
import { Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";
import mssql from 'mssql'
import sqlConfig from "../config/config";
import sendMail from "../helper/Email";
import create_emailservice from '../Email_service/create_emailservice'
import complete_emailservice from "../Email_service/complete_emailservice";


const Todos:Todo[] = [];

//create a task
export const createtodo=async(req:Request,res:Response)=>{
    try {
        const id=uid()
        
        const{title, description, completionDate, status, assignedTo}= req.body as {title:string, 
            description:string, completionDate:string, status:string, assignedTo:string}
            
        let pool= await mssql.connect(sqlConfig)
    
        await pool.request()
        .input('id' ,mssql.VarChar , id)
        .input('title' ,mssql.VarChar , title)
        .input('description' ,mssql.VarChar , description)
        .input('date' ,mssql.Date , completionDate)
        .input('status' ,mssql.VarChar(50) , status)
        .input('assignedTo', mssql.VarChar(100), assignedTo)
        .execute('createtask')
        res.status(200).json({message: 'Task Created Successfully'})
        try{
            create_emailservice(id)
        }catch(error)
        {
            console.log(error);
            
        }
    } catch (error:any) {
        res.json({error:error.message})
    }
    
}

//complete a task
export const completeTodo:RequestHandler=async(req,res,next)=>{
    try {
        const {id, submission} = req.body as {id:string, submission:string}
        let pool= await mssql.connect(sqlConfig)
        const check= await pool.request()
        .input('id' ,mssql.VarChar , id)
        .execute('gettask')
        
        if(!check.recordset[0]){
            res.json({message: 'task with id ${id }does not exist'})
        }
        const task= await pool.request()
        .input('id' ,mssql.VarChar(100) , id)
        .input('submission', mssql.VarChar(100), submission)
        .execute('completetask')
            res.json("task completed")
            console.log();
            
            try{  
                complete_emailservice(id)
            }catch(error)
            {
                console.log(error);
                
            }
     } catch (error:any) {
        res.json({error:error.message})
     }
    }

//get all tasks
export const getTodos:RequestHandler=async(req,res,next)=>{
    try {
       let pool= await mssql.connect(sqlConfig)
       const task= await pool.request().execute('gettasks')
           res.json(task.recordset)
    } catch (error:any) {
       res.json({error:error.message})
    }
   }

//get completed tasks
export const getcompletedTodos:RequestHandler=async(req,res,next)=>{
    try {
       let pool= await mssql.connect(sqlConfig)
       const task= await pool.request().execute('getcompleted')
           res.json(task.recordset)
    } catch (error:any) {
       res.json({error:error.message})
    }
   }

//get uncompleted tasks
export const getuncompleteTodos:RequestHandler=async(req,res,next)=>{
    try {
       let pool= await mssql.connect(sqlConfig)
       const task= await pool.request().execute('getuncompleted')
           res.json(task.recordset)
    } catch (error:any) {
       res.json({error:error.message})
    }
   }

//update task
export const updateTodos=async(req:Request,res:Response)=>{
    try {
        const {id,completionDate,title, description, status, assignedTo} = req.body as {id:string,
         completionDate:string,title:string, description:string, status:string, assignedTo:string}
        let pool= await mssql.connect(sqlConfig)

        const check= await pool.request()
        .input('id' ,mssql.VarChar , id)
        .execute('gettask')
        if(!check.recordset[0]){
            res.json({message: 'task with id ${id }does not exist'})
        }
        const task= await pool.request()
        .input('id' ,mssql.VarChar , id)
        .input('date' ,mssql.Date , completionDate)
        .input('title' ,mssql.VarChar(50) , title)
        .input('description' ,mssql.VarChar(50) , description)
        .input('assignedTo', mssql.VarChar(100), assignedTo)
        .execute('updatetask')
        res.json("tasks updated successfully")
    } catch (error:any) {
        res.json({error:error.message})
    }
}

//delete task

export const deleteTodos= async(req:Request,res:Response)=>{
   
   try {
    const id = req.params.id
    let pool= await mssql.connect(sqlConfig)
    const check= await pool.request()
        .input('id' ,mssql.VarChar , id)
        .execute('gettask')
        if(!check.recordset[0]){
            res.json({message: 'task with id ${id }does not exist'})
        }
    const task= await pool.request()
    .input('id' ,mssql.VarChar(100) , id)
    .execute('deletetask')
  
    res.json({message:'User Deleted Successfully'})
   }  catch (error:any) {
    res.json({error:error.message
     }
        )
}
}

// get a task
export const getTodo:RequestHandler=async(req,res)=>{
    try {
        const id = req.params.id
       let pool= await mssql.connect(sqlConfig)
       const task= await pool.request()
       .input('id' ,mssql.VarChar(100) , id)
       .execute('gettask')
           res.json(task.recordset)
    } catch (error:any) {
       res.json({error:error.message})
    }
   }