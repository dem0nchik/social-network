require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
})

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if(err) return console.log(err)
    console.log('Message sent successfully!');
    console.log(info);
  })
}



module.exports = mailer