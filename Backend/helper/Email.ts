import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

function createTransporter (config:any){
    let transporter = nodemailer.createTransport(config)
    return transporter
}

const configuration={
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth:{
        user:process.env.EMAIL as string,
        pass: process.env.EMAIL_PASS as string
    }
}

const sendMail = async(mailoptions:any)=>{
    const transporter = createTransporter(configuration)
    await transporter.verify
    await transporter.sendMail(mailoptions)
}

export default sendMail