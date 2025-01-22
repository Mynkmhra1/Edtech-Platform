require('dotenv').config();

const nodemailer = require('nodemailer');

const mailSender = async (title, body, email) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, // Use TLS
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"Mayank Project" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email sent successfully:", info);
        return info; // Ensure this is returned
    } catch (err) {
        console.error("Error in sending mail:", err.message);
        throw err;
    }
};

module.exports = mailSender;
