const nodemailer = require('nodemailer');
const emailResponse = require('../utils/emailResponse');

// mailtrap email send
const mailtrapEmailSend = async ({to, url, subject, html }) => {
      if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    console.log("Email envs r not available");
    return;
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user,
      pass,
    },
  });

  if(purpose === emailResponse.register.purpose){
    subject = emailResponse.register.subject
    html = `${emailResponse.register.html}?token=${url}`
  }

    await transporter.sendMail({
    from,
    to,
    subject,
    html,
  });

  return true
}

const googleEmailSend = async (to, url, purpose) => {
    try {
        if(!process.env.EMAIL_PROVIDER || !process.env.EMAIL_PASSWORD) return console.eror("Google env's are not available")
        
        console.log("Processing")
        const transporter = await nodemailer.createTransport({
        service: "Gmail",
        auth: {
        user: process.env.EMAIL_PROVIDER ,
        pass: process.env.EMAIL_PASSWORD ,
      },
    });

    if(purpose === emailResponse.register.purpose){
    subject = emailResponse.register.subject,
    text = emailResponse.register.text,
    html = `${emailResponse.register.html}?token=${url}`
    }

    await transporter.sendMail({
        from:process.env.EMAIL_FROM,
        to,
        subject,
        text, // Plain-text version of the message
        html, // HTML version of the message
    })
    console.log("email Send")
    console.log(transporter);

    return true
    
    } catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    mailtrapEmailSend,
    googleEmailSend
}