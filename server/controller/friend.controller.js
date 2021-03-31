const db = require('../services/db')

class friendController {

  async #checkUserInFriendsTable(userId) {
    try {
      const user = await db.query(
        `SELECT f.user_id FROM friends f WHERE f.user_id = $1`, [userId]
        )
        
      !user.rows.length && 
        await db.query(
          `INSERT INTO friends(user_id) VALUES ($1)`, [userId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #addingNewFriends(friendId, userId) {
    try {
      await this.#checkUserInFriendsTable(userId)
      await this.#checkUserInFriendsTable(friendId)

      await db.query(
        `INSERT INTO friend_people(f_id, friend, active) 
        VALUES ((SELECT f_id FROM friends WHERE user_id = $1), $2, true)`, [userId, friendId]
        )
      await db.query(
        `INSERT INTO friend_people(f_id, friend, active) 
        VALUES ((SELECT f_id FROM friends WHERE user_id = $2), $1, true)`, [userId, friendId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #removeFriendsFromDB(friendId, userId) {
    try {
      await db.query(
        `DELETE FROM friend_people fp WHERE 
        (SELECT fp.f_id FROM friend_people fp
              RIGHT JOIN friends f ON f.f_id = fp.f_id
              WHERE f.user_id = $1 AND fp.friend = $2) = fp.f_id AND fp.friend = $2`, [userId, friendId]
        )
      await db.query(
        `DELETE FROM friend_people fp WHERE 
        (SELECT fp.f_id FROM friend_people fp
              RIGHT JOIN friends f ON f.f_id = fp.f_id
              WHERE f.user_id = $2 AND fp.friend = $1) = fp.f_id AND fp.friend = $1`, [userId, friendId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #isActiveFriend(friendId, userId) {
    try {
      return await db.query(
        `SELECT fp.active FROM friend_people fp
        INNER JOIN friends f ON f.f_id = fp.f_id
        WHERE f.user_id = $1 AND fp.friend = $2`, [userId, friendId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #getLimitFriendsUserFromDB(userId) {
    try {
      return await db.query(
        `SELECT u.profile_mini_img, u.name, u.surname, u.id FROM friend_people fp
          INNER JOIN friends f ON f.f_id = fp.f_id
          INNER JOIN users u ON fp.friend = u.id
          WHERE f.user_id = $1
          ORDER BY fp.f_id ASC
          LIMIT 6`,
          [userId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #getAllFriendsUserFromDB(userId) {
    try {
      return await db.query(
        `SELECT u.profile_mini_img, u.name, u.surname, u.id FROM friend_people fp
          INNER JOIN friends f ON f.f_id = fp.f_id
          INNER JOIN users u ON fp.friend = u.id
          WHERE f.user_id = $1
          ORDER BY fp.f_id ASC`,
          [userId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #totalCountFriendsUserInDB(userId) {
    try {
      return await db.query(
        `SELECT COUNT(fp.f_id) FROM friend_people fp
        LEFT JOIN friends f ON f.f_id = fp.f_id
        WHERE f.user_id = $1`,
          [userId]
        )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  #returnFriendsListArray(friendsArray) {
    if(friendsArray.length) {
      return friendsArray.map(friend => {
        return {
          profileImg: friend.profile_mini_img,
          name: `${friend.name} ${friend.surname}`,
          link: `/id${friend.id}`
        }
      })
    } else {
      return friendsArray
    }
  }


  async getDataFriend(req, res) {
    try {
      const friendId = +req.params.id
      const userId = req.session.idUserSession
      
      if (Number.isInteger(friendId)) {
        const dataFriendInDB = await db.query(`SELECT * FROM users WHERE id = $1`, [friendId])
        const friend = dataFriendInDB.rows[0]
        
        const activeFriend = !!userId ? await this.#isActiveFriend(friendId, userId) : false

        const returnActive = () => {
          return !!activeFriend.rows.length ? activeFriend.rows[0].active : false
        }

        const getAllFriends = await this.#getLimitFriendsUserFromDB(friendId)
        const countFriends = await this.#totalCountFriendsUserInDB(friendId)

        if (friend) {
          res.json({
            id: friend.id,
            name: friend.name,
            surname: friend.surname,
            profile_img: friend.profile_img,
            friendList: {
              list: this.#returnFriendsListArray(getAllFriends.rows),
              count: countFriends.rows[0].count
            },
            active: activeFriend ? returnActive() : false
          })
        } else {
          res.json({err: 'not found'})
        }
      } else {
        res.status(404).json({err: 'incorect friend id'})
      }
    } catch (err) {
      console.log(err);
      res.status(500).end()
      return new Error(err)
    }
  }

  async newFriendToUser(req, res) {
    if (req.session.idUserSession) {
      try {
          if (Number.isInteger(+req.params.id)) {
            const friendId = +req.params.id
            const userId = req.session.idUserSession

            await this.#addingNewFriends(friendId, userId)
            const activeFriend = await this.#isActiveFriend(friendId, userId)

            const returnActive = () => {
              return !!activeFriend.rows.length ? activeFriend.rows[0].active : false
            }

            const getAllFriends = await this.#getLimitFriendsUserFromDB(friendId)
            const countFriends = await this.#totalCountFriendsUserInDB(friendId)

            res.json({
              friendList: {
                list: this.#returnFriendsListArray(getAllFriends.rows),
                count: countFriends.rows[0].count
              },
              active: returnActive()
            })

        } else {
          res.status(404).json({err: 'incorrect friend id'})
        }
      } catch (err) {
        console.error(err);
        res.status(500).end()
        return new Error(err)
      }
    } else {
      res.status(403).end()
    }
  }

  async removeFriendToUser(req, res) {
    if (req.session.idUserSession) {
      try {
          if (Number.isInteger(+req.params.id)) {
            const friendId = +req.params.id
            const userId = req.session.idUserSession

            await this.#removeFriendsFromDB(friendId, userId)
            const activeFriend = await this.#isActiveFriend(friendId, userId)

            const returnActive = () => {
              return !!activeFriend.rows.lenght ? activeFriend.rows[0].active : false
            } 

            const getAllFriends = await this.#getLimitFriendsUserFromDB(friendId)
            const countFriends = await this.#totalCountFriendsUserInDB(friendId)

            res.json({
              friendList: {
                list: this.#returnFriendsListArray(getAllFriends.rows),
                count: countFriends.rows[0].count
              },
              active: returnActive()
            })

        } else {
          res.status(404).json({err: 'incorrect friend id'})
        }
      } catch (err) {
        console.error(err);
        res.status(500).end()
        return new Error(err)
      }
    } else {
      res.status(403).end()
    }
  }

  async getFriendListToUser(req, res) {
    if (req.session.idUserSession) {
      try {
        const userId = req.session.idUserSession

        const activeFriend = await this.#getAllFriendsUserFromDB(userId)
        const countFriends = await this.#totalCountFriendsUserInDB(userId)

        res.json({
          list: this.#returnFriendsListArray(activeFriend.rows),
          count: countFriends.rows[0].count
        })
      } catch (err) {
        console.error(err);
        res.status(500).end()
        return new Error(err)
      }
    } else {
      res.status(403).end()
    }
  }

  async getFriendListToUserView(req, res) {
    try {
      const userId = +req.params.id

      const activeFriend = await this.#getAllFriendsUserFromDB(userId)
      const countFriends = await this.#totalCountFriendsUserInDB(userId)
      
      res.json({
        list: this.#returnFriendsListArray(activeFriend.rows),
        count: countFriends.rows[0].count
      })
    } catch (err) {
      console.error(err);
      res.status(500).end()
      return new Error(err)
    }
  }

}

module.exports = new friendController()