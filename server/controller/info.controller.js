const db = require('../services/db')

class infoController {

  #returnListUsersArray(listUsers) {
    if(listUsers.length) {
      return listUsers.map(user => {
        return {
          profileImg: user.profile_mini_img,
          name: `${user.name} ${user.surname}`,
          link: `/id${user.id}`
        }
      })
    } else {
      return listUsers
    }
  }

  async getListUsers(req, res) {
    try {
      const listUsersInDB = await db.query(
        `SELECT u.name, u.surname, u.profile_mini_img, u.id FROM users u
          WHERE u.active = true
          ORDER BY u.id DESC
          LIMIT 10`, []
      )
      const listUsers = listUsersInDB.rows

      res.json({listUsers: this.#returnListUsersArray(listUsers)})
    } catch (err) {
      console.error(err);
      res.status(500).end()
      return new Error(err)
    }
  }

  async getAllListUsers(req, res) {
    try {
      const listUsersInDB = await db.query(
        `SELECT u.name, u.surname, u.profile_mini_img, u.id FROM users u
          WHERE u.active = true
          ORDER BY u.id DESC
          LIMIT 100`, []
      )
      const listUsers = listUsersInDB.rows

      res.json({listAllusers: this.#returnListUsersArray(listUsers)})
    } catch (err) {
      console.error(err);
      res.status(500).end()
      return new Error(err)
    }
  }


  async getUserImages(req, res) {
    try {
      const userId = +req.body.userId
      if (Number.isInteger(userId)) {
        const imagesUserInDB = await db.query(
          `SELECT pi.image FROM post_img pi
          LEFT JOIN post p ON p.post_id = pi.post_id
          LEFT JOIN users u ON p.user_id = u.id
          WHERE u.id = $1
          ORDER BY pi.pi_id DESC`, [userId]
        )
        

        res.json({imagesUser: imagesUserInDB.rows})
      } else {
        res.status(404).json({err: 'incorect user id'})
      }
    } catch (err) {
      console.error(err);
      res.status(500).end()
      return new Error(err)
    }
  }
  
}

module.exports = new infoController()