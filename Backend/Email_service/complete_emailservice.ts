import sendMail from '../helper/Email'
import ejs from 'ejs'
import dotenv from 'dotenv'
import mssql from 'mssql'
import sqlConfig from '../config/config'
dotenv.config()

interface TaskInterface{
   id: string;
   title: string;
   descriptions:  string;
   completionDate:  string;
   email:  string;
   status:string
}

const complete_emailservice = async(id:string)=>{
    const pool = await mssql.connect(sqlConfig)
    const task = await pool.request()
    .input('id', mssql.VarChar(100), id)
    .execute('gettask')
    const data = task.recordset
    data.map((item:any)=>{ 
        
        ejs.renderFile('./template/complete.ejs', {title:item.title, description:item.descriptions, date:item.completionDate, submission:item.submission}, async (error, data)=>{
            const mailoptions={
                from: process.env.EMAIL,
                to: process.env.ADMIN,
                subject: 'Task completion',
                html: data
        
            }
            try{
                await sendMail(mailoptions)
                console.log("success");
                
            }
            catch(error){
                console.log(error);
                
            }
        })
    })      
}
export default complete_emailservice