const db = require('../services/db')

class infoController {

  #returnListUsersArray(listUsers) {
    if(listUsers.length) {
      return listUsers.map(user => {
        return {
          profileImg: user.profile_img,
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
        `SELECT u.name, u.surname, u.profile_img, u.id FROM users u
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
  
}

module.exports = new infoController()