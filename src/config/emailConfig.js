const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.email.com",
  auth: {
    user: "khandalajaydip761@gmail.com",
    pass: "mcci nsae zjbg clfc",
  },
  secure: true
})

const sentOTP=(to,subject,html)=>{
    const maildata={
        from:"khandalajaydip761@gmail.com",
        to:to,
        subject:subject,
        html:html
    }

    transporter.sendMail(maildata);

    return true
}

module.exports={sentOTP}