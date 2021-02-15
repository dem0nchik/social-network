const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');


// var date = new Date();
// var mail = {
//             "id": user.id,
//             "created": date.toString()
//             }

// const token_mail_verification = jwt.sign(mail, config.jwt_secret_mail, { expiresIn: '1d' });

// var url = config.baseUrl + "verify?id=" + token_mail_verification;



const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: 'dimabudyk@ukr.net',
    pass: 'zkVE5Dps2SpF4Wi0'
  }
})

// let info = await transporter.sendMail({
//   from: '"NAME" <user@domain.com>', // sender address
//   to: user.email, // list of receivers seperated by comma
//   subject: "Account Verification", // Subject line
//   text: "Click on the link below to veriy your account " + url, // plain text body
// }, (error, info) => {

//   if (error) {
//       console.log(error)
//       return;
//   }
//   console.log('Message sent successfully!');
//   console.log(info);
//   transporter.close();
// });

// app.get('/verify', function(req, res) {
//   token = req.query.id;
//   if (token) {
//       try {
//           jwt.verify(token, config.jwt_secret_mail, (e, decoded) => {
//               if (e) {
//                   console.log(e)
//                   return res.sendStatus(403)
//               } else {
//                   id = decoded.id;

              
// //Update your database here with whatever the verification flag you are using 
//               }

//           });
//       } catch (err) {

//           console.log(err)
//           return res.sendStatus(403)
//       }
//   } else {
//       return res.sendStatus(403)

//   }

// })

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if(err) return console.log(err)

    console.log('Email sent: ', info)
  })
}



module.exports = mailer