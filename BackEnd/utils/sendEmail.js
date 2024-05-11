const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async ({ email, html }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD, 
        },
    });

    
    let info = await transporter.sendMail({
        from: '"BookOne" <no-reply.bookone@gmail.com>',
        to: email, 
        subject: "Forgot password", 
        html: html, 
    });
    return info
}

module.exports = sendMail