


import nodemailer from "nodemailer";

const user = import.meta.env.VITE_GOOGLE_EMAIL;
const pass = import.meta.env.VITE_SMTP_PASS;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "cinematicketingsystem92@gmail.com",
        pass: "ekoh siyg bjex lzwx"
    }
})

transporter.verify( (error, message) => {
    if(error){
        console.log(error)
    }else{
        console.log("server ready to take msg")
    }
})

export default transporter;