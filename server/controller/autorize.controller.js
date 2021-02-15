// 

// class UserController{

//   async getUsers(req, res) {
//     const users = await db.query('SELECT * FROM person')
//     res.json(users.rows)
//   }
//   async getOneUser(req, res) {
//     const id = req.params.id
//     const users = await db.query('SELECT * FROM person WHERE id = $1', [id])
//     res.json(users.rows)
//   }
//   async updateUser(req, res) {
    
//   }
//   async deleteUser(req, res) {
//     const id = req.params.id
//     const users = await db.query('DELETE FROM person WHERE id = $1', [id])
//     res.json(users.rows)
//   }
// }

const bcrypt = require('bcrypt');
const { validateEmail } = require('../utilits/utilits');
const db = require('../services/db')

class AutorizeController {

  async createUser({email, password, name, surname}) {
    try {
      const saltRounds = 10;

      const hasUserInDB = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

      if (!hasUserInDB.rows[0]) {
        const hashPassword = await bcrypt.hash(password, saltRounds)

        const newPerson = await db.query(
          `INSERT INTO users(email, "password", name, surname) VALUES ($1, $2, $3, $4) RETURNING *`, 
            [email, hashPassword, name, surname])
            
        return {
          message: 'Пользователь успешно создан',
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

  formLoginUser(req, res) {
    if(req.session.name) {
      console.log(req.session.name);
    } else {
      console.log(req.session, 'created');
      req.session.name = 'vasya'
    }
    res.status(200).json({isAutorize: true ,message: 'success login', fieldsIssues: []})
  }

  formCreateUser(req, res) {
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

    } else if (name.length < 2 || surname.length < 2) {
      message = 'Неправильное имя или фамилия'
      fields.push('name', 'surname')
      status = false

    } else {
      message = 'Успешная регистрация'
      status = true
    }

    //Status registaration
    if(status) {
      this.createUser({email, password, name, surname}).then(data => console.log(data))

      res.status(200).json({message, registerStatus: true, fieldsIssues: fields}) 
    } else {
      res.status(200).json({message, registerStatus: false, fieldsIssues: fields}) 
    }
  }

  checkAutorizeUser(req, res) {
    if(req.session.name) {
      res.status(200).json({isAutorize: true})
    } else {
      res.status(200).json({isAutorize: false})
    }
  }

}

module.exports = new AutorizeController()