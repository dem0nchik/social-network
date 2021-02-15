require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const jwt = require('jsonwebtoken');

const routes = require('./routes')
const db = require('./services/db')
const mailer= require('./services/nodemailer')

const PORT = process.env.PORT || 8080
const app = express()

const sessionConfig = {
  store: new pgSession({
      pool: db,
      tableName: 'session'
  }),
  name: 'SID',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      aameSite: true,
      secure: false // ENABLE ONLY ON HTTPS
  }}
app.use(session(sessionConfig))

app.use(express.json())
app.use(cors({origin: process.env.BASE_URL, credentials: true }))
app.use('/api', routes.autorizeRouter)


app.get('/', (req, res) => {
  const message = {
    from: 'Service xcxlow <dimabudyk@ukr.net>',
    to: 'dimabudyk@gmail.com',
    subject: 'Hello',
    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+'http://localhost:4000/'+">Click here to verify</a>" 
  }
  mailer(message)
  res.send('mail sent')
})



var date = new Date();
var mail = {
            "id": '103',
            "created": date.toString()
            }

const token_mail_verification = jwt.sign(mail, process.env.jwt_secret_mail, { expiresIn: '1d' });

var url = process.env.BASE_URL.toString() + "/verify?id=" + token_mail_verification;


app.get('/verify', function(req, res) {
  token = req.query.id;
  if (token) {
      try {
          jwt.verify(token, process.env.jwt_secret_mail, (err, decoded) => {
              if (err) {
                  console.log(err)
                  return res.sendStatus(403)
              } else {
                  id = decoded.id;
                  console.log(id);

              }

          });
      } catch (err) {

          console.log(err)
          return res.sendStatus(403)
      }
  } else {
      return res.sendStatus(403)

  }

})


app.listen(PORT, () => console.log('Server is run on port', PORT))


//node mailer 
//ukr net pass: zkVE5Dps2SpF4Wi0