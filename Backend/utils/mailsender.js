require('dotenv').config();

const nodemailer = require('nodemailer');

const mailSender=async (title,body,email)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        })

        let info=await transporter.sendMail({
            from:"Mayank project",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
    console.log(info)
    return info;

    }catch(err){
        console.log("error in sending mail",err)
    }
}
module.exports = mailSender;
