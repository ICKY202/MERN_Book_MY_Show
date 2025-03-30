

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');


const replaceContent = (content, creds) => {
    const allKeys = Object.keys(creds);
    allKeys.forEach((key) => {
        content = content.replace(`#{${key}}`, creds[key]);
    });

    return content;
}


async function EmailHelper(templateName, receiverEmail, creds, bookingConfirmation) {
    try {
        const templatePath = path.join(__dirname, 'email_templates', templateName);
        const content = await fs.promises.readFile(templatePath, 'utf-8'); 
        // console.log(content);  
        const tranportDetails = {
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "vigneshm674@gmail.com",
                pass: "lrdb iebj pazf skla",
            }
        }
        const transporter = nodemailer.createTransport(tranportDetails);
        await transporter.sendMail({
            from: 'vigneshm674@gmail.com',
            to: receiverEmail,
            subject: bookingConfirmation,
            html: replaceContent(content, creds)
        })
    }catch(err) {
        console.log(err.message);
    }
}


module.exports = EmailHelper;
