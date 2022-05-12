import express from 'express'
import router from './Routes/Routes'
import mssql from 'mssql'
import sqlConfig from './config/config'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())
app.use('/Todo', router)

app.listen(7000, ()=>{
    console.log("listening to port 7000");
    
})

const checkConnection=async ()=>{
    await mssql.connect(sqlConfig).then(
         x=>{
            if( x.connected){
                console.log('Database Connected');
              
            }
         }
     ).catch(err=>{
         console.log(err.message);
     })
     }
    
     checkConnection()