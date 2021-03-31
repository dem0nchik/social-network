const db = require('../../services/db')

const setUserOnlineStatus = async (userId, status) => {
  try {
    const hasUserInTable =  await db.query(
      `SELECT user_id FROM user_online_status WHERE user_id = $1`,
        [userId]
      )
    if (!hasUserInTable.rows[0]) {
      return await db.query(
        `INSERT INTO user_online_status(user_id, is_online, date_last) 
        VALUES ($1, $2, CURRENT_TIMESTAMP)`,
          [userId, status]
        )
    } else {
      return await db.query(
        `UPDATE user_online_status 
        SET is_online = $2, date_last = CURRENT_TIMESTAMP
        WHERE user_id = $1`,
          [userId, status]
        )
    }
  } catch (err) {
    console.error(err)
    return new Error(err)
  }
}

module.exports = setUserOnlineStatus