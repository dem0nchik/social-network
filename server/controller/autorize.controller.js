require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { validateEmail } = require('../utilits/utilits')
const db = require('../services/db')
const mailer= require('../services/nodemailer')

class AutorizeController {


  checkExistsUser(email) {
    try {
      return db.query(`SELECT * FROM users WHERE email = $1`, [email])
    } catch (err) {
      return new Error(err)
    }
  }


  //Create user in DB
  async createUser({email, password, name, surname}) {
    try {
      const saltRounds = 10;

      const hasUserInDB = await this.checkExistsUser(email)

      //check exists user in DB
      if (!hasUserInDB.rows[0]) {
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const newPerson = await db.query(
          `INSERT INTO users(email, "password", name, surname) VALUES ($1, $2, $3, $4) RETURNING *`,
            [email.trim(), hashPassword, name.trim(), surname.trim()])

        return {
          message: 'Пользователь успешно создан, подтвердите ваш email',
          data: newPerson.rows[0]
        }
      } else {
        return {
          message: 'Пользователь с таким Email уже существует',
          data: null
        }
      }

    } catch (err) {
      console.log(err);
      return new Error('Some wrong with DB')
    }
  }

  //Login user
  async formLoginUser(req, res) {
    const {email, password} = req.body
    let message = ''
    const fields = ['email', 'password']
    let status = false

    if (!email || !password) {

      message = 'Все поля должны быть заполнены!'
      status = false

    } else if (!validateEmail(email)) {

      message = 'Введите правильный email'
      status = false

    } else if (password.length < 6) {

      message = 'Введите правильный пароль и email'
      status = false

    } else { status = true }
    
    if (status) {
      const hasUserInDB = await this.checkExistsUser(email.trim())
      const user = hasUserInDB.rows[0]
      
      if (!user) {
        message = 'Введите правильный пароль и email'
        res.status(200).json({isAutorize: false, message, fieldsIssues: fields})

      } else {

        if (user.active) {
          const hashPassword = user.password

          await bcrypt.compare(password, hashPassword, (err, result) => {
            if (err) return console.error(err)

            if(result) {
              message='Успешный вход'
              req.session.idUserSession = user.id
              res.json({isAutorize: true, message, fieldsIssues: []})

            } else {
              message = 'Введите правильный пароль и email'
              res.status(200).json({isAutorize: false, message, fieldsIssues: fields})
            }          
          })
        } else {
          message = 'Ваш аккаунт не активирован, подтвердите вашу почту'
          res.json({isAutorize: false, message, fieldsIssues: fields})
        }
      }
    } else {
      res.json({isAutorize: false, message, fieldsIssues: fields})
    }
  }


  //Registrer user
  async formCreateUser(req, res) {
    const {email, password, password_apply, name, surname} = req.body
    let message = ''
    const fields = []
    let status = false

    if (!email || !password || !password_apply || !name || !surname) {

      message = 'Все поля должны быть заполнены!'
      fields.push('email', 'password', 'password_apply', 'name', 'surname')
      status = false

    } else if (!validateEmail(email)) {

      message = 'Введите правильный email'
      fields.push('email')
      status = false

    } else if (password.length < 6) {

      message = 'Длина пароля должна быть не менее 6 символов'
      fields.push('password', 'password_apply')
      status = false

    } else if (password !== password_apply) {

      message = 'Пароли не совпадают'
      fields.push('password', 'password_apply')
      status = false

    } else if (name.length < 2 || name.length > 36 
              || surname.length < 2 || surname.length > 36) {
      message = 'Неправильное имя или фамилия'
      fields.push('name', 'surname')
      status = false

    } else {
      message = 'Успешная регистрация'
      status = true
    }

    //Status registaration
    if(status) {
      let user = {}

      await this.createUser({email, password, name, surname})
        .then(infoCreateUser => {
          message = infoCreateUser.message
          user = infoCreateUser.data
        })

      if(user) {
        //Sent mail with link verification
        const mail = { "idToken": user.id, "created": new Date().toString() }

        const token_mail_verification =
            jwt.sign(mail, process.env.jwt_secret_mail, { expiresIn: '1d' });

        const url = process.env.BASE_URL.toString() + "/verify?idToken=" + token_mail_verification;

        await mailer({
          from: 'Service XCXLOW <dimabudyk@ukr.net>',
          to: user.email.trim(),
          subject: 'Подтвердите ваш аккаунт на сайте xcxlow.',
          html : `<div style="padding:5pxfont-size:20px;">Привет, ${user.name} 👻<br/><br/>Пожалуйста нажми на ссылку чтобы подтвердить свой email<br><a href="${url}">${url}</a>`
        })


        res.json({message, registerStatus: true, fieldsIssues: []})

      } else {
        res.json({message, registerStatus: false, fieldsIssues: fields})
      }
    } else {
      res.json({message, registerStatus: false, fieldsIssues: fields})
    }
  }

  //Verify user mail
   verifyUserMail(req, res) {
    const token = req.query.idToken;
    if (token) {
        try {
            jwt.verify(token, process.env.jwt_secret_mail, async (err, decoded) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(403)
                } else {
                  const idToken = decoded.idToken;

                  await db.query(`UPDATE users SET active=true WHERE id = $1`, [idToken])
                  
                  res.json({verifyUser: true})
                }
            });
        } catch (err) {
            console.log(err)
            return res.sendStatus(403)
        }
    } else {
        return res.sendStatus(403)
    }
  }

  //log out
  logoutUser(req, res) {
    req.session.destroy(() => {
      res.redirect(process.env.BASE_URL)
    });
  }

  //Check autorize user in app
  checkAutorizeUser(req, res) {
    if(req.session.idUserSession) {
      res.json({isAutorize: true})
    } else {
      res.json({isAutorize: false})
    }
  }

}

module.exports = new AutorizeController()