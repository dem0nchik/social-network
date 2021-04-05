require('dotenv').config()
const db = require('../services/db')
const utilits = require('../utilits/utilits')

class chatController {

  async handleChat(req, res) {
    try {
      const userId = +req.session.idUserSession
      const friendId = +req.body.friendId

      if (Number.isInteger(userId) && Number.isInteger(friendId)) {
        const exsistChatInTable =  await db.query(
          `SELECT chat_id FROM chat 
            WHERE user_id = $1 AND friend_id = $2 
            OR friend_id = $1 AND user_id = $2`,
            [userId, friendId]
          )
        if (!exsistChatInTable.rows[0]) {
          const createChat = await db.query(
            `INSERT INTO chat(user_id, friend_id)
            VALUES ($1, $2) RETURNING *`,
              [userId, friendId]
            )

          const chatId = createChat.rows[0].chat_id
          res.json({ulr: `${process.env.BASE_URL}/chat${chatId}`})
        } else {
          const chatId = exsistChatInTable.rows[0].chat_id
          res.json({ulr: `${process.env.BASE_URL}/chat${chatId}`})
        }
      } else {
        res.status(404).json({err: 'incorect user id'})
      }
    } catch (err) {
      console.error(err);
      res.status(500).end()
      return new Error(err)
    }
  }

  async #getLastMessageInChat(chatId) {
    try {
      return await db.query(
        `SELECT cm.body_text, cm.date_create, cms.is_read FROM chat_msg cm
        INNER JOIN chat c ON c.chat_id = cm.chat_id
		    INNER JOIN chat_msg_status cms ON cms.msg_id = cm.msg_id
        WHERE c.chat_id = $1
        ORDER BY cm.msg_id DESC
        LIMIT 1
        `,
          [chatId]
        )
    } catch (error) {
      console.error(error)
      return new Error(error)
      
    }
  }

  async #getCountUnreadChat(chatId, userId) {
    try {
      return await db.query(
        `SELECT count(cms.is_read) FROM chat_msg cm
        INNER JOIN chat c ON c.chat_id = cm.chat_id
        INNER JOIN chat_msg_status cms ON cm.msg_id = cms.msg_id
        WHERE c.chat_id = $1 AND cms.user_id <> $2 AND cms.is_read = false
        `,
          [chatId, userId]
        )
    } catch (error) {
      console.error(error)
      return new Error(error)      
    }
  }


  async #getChatListInDB(userId, limit = 99999999) {
    try {
      return await db.query(
        `SELECT c.chat_id, c.user_id, c.friend_id, u.name, u.surname, uos.date_last, 
        u.profile_mini_img, uos.is_online, uos.user_id as "user_active" FROM chat c
        LEFT JOIN user_online_status uos 
        ON uos.user_id != $1
        AND (uos.user_id = c.friend_id
          OR uos.user_id = c.user_id)
        INNER JOIN users u ON u.id = uos.user_id
        WHERE c.user_id = $1 OR c.friend_id = $1
        ORDER BY c.chat_id DESC
        LIMIT $2`,
          [userId, limit]
        )
    } catch (error) {
      console.error(error)
      return new Error(error)      
    }
  }

  async #getChatList(arrayChats, userId) {
    if(arrayChats.length) {
      try {
        const newArrayChat = arrayChats.map(async (chat) => {
          const lastMessage = await this.#getLastMessageInChat(chat.chat_id)
          const countRead = await this.#getCountUnreadChat(chat.chat_id, userId)
          const lastMessageText = lastMessage.rows[0]?.body_text 
            ? lastMessage.rows[0]?.body_text.length > 150
              ? lastMessage.rows[0]?.body_text.substr(0, 150)+'...'
              : lastMessage.rows[0]?.body_text
            : null

          return {
            chatId: chat.chat_id,
            profileImg: chat.profile_mini_img,
            name: `${chat.name} ${chat.surname}`,
            linkToProfile: `/id${chat.user_active}`,
            isOnline: utilits.returnOnlineUser(chat.date_last),
            lastMessageText,
            lastMessageDate: lastMessage.rows[0]?.date_create || null,
            lastMessageIsRead: lastMessage.rows[0]?.is_read === undefined ? null : !!lastMessage.rows[0].is_read,
            countUnread: countRead.rows[0].count
          }
        })
        const promiseArrayChat = await Promise.all(newArrayChat)
        const sortedArrayChat = promiseArrayChat.sort((a,b)=>{
          return new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
        })

        return sortedArrayChat
      } catch (error) {
        console.error(error)
        return new Error(error)
      }
    } else {
      return arrayChats
    }
  }

  async getLimitChatList(req, res) {
    try {
      const userId = +req.session.idUserSession
      const LIMIT_LIST = 10 

      if (Number.isInteger(userId)) {
        const getChatListInDB =  await this.#getChatListInDB(userId, LIMIT_LIST)          
        const chatArray = await this.#getChatList(getChatListInDB.rows, userId)
                
        res.json(chatArray)
      } else {
        res.status(403).end()
      }
    } catch (err) {
      console.error(err);
      res.status(500).end()
      return new Error(err)
    }
  }

  async getChatList(req, res) {
    try {
      const userId = +req.session.idUserSession

      if (Number.isInteger(userId)) {
        const getChatListInDB =  await this.#getChatListInDB(userId)          
        const chatArray = await this.#getChatList(getChatListInDB.rows, userId)
        
        res.json(chatArray)
      } else {
        res.status(403).end()
      }
    } catch (err) {
      console.error(err);
      res.status(500).end()
      return new Error(err)
    }
  }

  async #checkAccessToChat(chatId, userId) {
    try {
        const returnedChat =  await db.query(
          `SELECT c.chat_id, c.user_id, c.friend_id FROM chat c
          WHERE c.chat_id = $1 AND (user_id = $2 OR friend_id = $2)`,
            [chatId, userId]
          )
        return !!returnedChat.rows[0]
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #getInfoAboutChat(chatId, userId) {
    try {
        const returnedChatInfo =  await db.query(
          `SELECT u.name, u.surname, uos.date_last, 
          u.profile_mini_img, uos.is_online, uos.user_id FROM chat c
          LEFT JOIN user_online_status uos 
          ON uos.user_id != $2
		        AND (uos.user_id = c.friend_id
            OR uos.user_id = c.user_id)
          INNER JOIN users u ON u.id = uos.user_id
          WHERE c.chat_id = $1`,
            [chatId, userId]
          )
        return returnedChatInfo.rows[0]
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async #getMessageList(chatId) {
    try {
        const returnedMessages =  await db.query(
          `SELECT cm.user_id as "sender", cm.body_text,
          cm.date_create, cms.user_id, cms.is_read FROM chat_msg cm
          INNER JOIN chat_msg_status cms ON cms.msg_id = cm.msg_id
          INNER JOIN chat c ON cm.chat_id = c.chat_id
          WHERE c.chat_id = $1
          ORDER BY cm.date_create ASC`,
          //LIMIT 50 OFFSET 0`,
            [chatId]
          )
        return returnedMessages.rows
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  #returnMessageListArray(arrayMessage, userId) {
    if(arrayMessage.length) {
      const list = []

      arrayMessage.forEach((message) => {
        const date = message.date_create.toISOString().substr(0, 10)

        if (list.length && (date === list[list.length-1].title)) {
          list[list.length-1].messages.push({
            bodyText: message.body_text,
            messageSelf: message.user_id === userId,
            time: message.date_create,
            isRead: message.is_read
          })
        } else {
          list.push({
            title: date,
            date: message.date_create,
            messages: [{
                bodyText: message.body_text,
                messageSelf: message.user_id === userId,
                time: message.date_create,
                isRead: message.is_read
            }]
          })
        }
      })
      return list

    } else {
      return arrayMessage
    }
  }

  async #setReadingMessage(chatId, userId) {
    try {
        return await db.query(
          `UPDATE chat_msg_status cms
          SET is_read = true
          FROM chat_msg cm
          INNER JOIN chat c ON cm.chat_id = c.chat_id
          WHERE c.chat_id = $1 AND cms.user_id <> $2 AND cms.msg_id = cm.msg_id`,
            [chatId, userId]
          )
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }


  async getInfoChat(req, res) {
    try {
      const userId = +req.session.idUserSession
      const chatId = +req.params.chatId

      if (Number.isInteger(userId) && Number.isInteger(chatId)) {
        const haveAccess = await this.#checkAccessToChat(chatId, userId)

        if (haveAccess) {
          await this.#setReadingMessage(chatId, userId)
          const infoAboutChat = await this.#getInfoAboutChat(chatId, userId)
          const messageList = await this.#getMessageList(chatId)
          const returnedMessageListArray = this.#returnMessageListArray(messageList, userId)
          

          res.json({
            isOnline: utilits.returnOnlineUser(infoAboutChat.date_last),
            profileImg: infoAboutChat.profile_mini_img,
            lastDateOnline: infoAboutChat.date_last,
            name: `${infoAboutChat.name} ${infoAboutChat.surname}`,
            linkToProfile: `/id${infoAboutChat.user_id}`,
            chatId,
            messageList: returnedMessageListArray
          })

        } else {
          res.json({
            err: 'have no access to chat', 
            urlToChats: `${process.env.BASE_URL}/chats`
          })
        }
      } else {
        res.status(403).end()
      }
    } catch (err) {
      console.error(err);
      res.status(500).end()
      return new Error(err)
    }
  }


  async #addNewMessageInDB(userId, chatId, message) {
    try {
      const returnedMessage =  await db.query(
        `INSERT INTO chat_msg(user_id, chat_id, body_text) 
        VALUES ($1, $2, $3) RETURNING *`,
          [userId, chatId, message]
        )
      if (!!returnedMessage.rows[0]) {
        const msgId = returnedMessage.rows[0].msg_id
        
        return await db.query(
          `INSERT INTO chat_msg_status(msg_id, is_read, user_id) 
          VALUES ($1, false, $2) RETURNING *`,
            [msgId, userId]
        )
      }
    } catch (err) {
      console.error(err)
      return new Error(err)
    }
  }

  async newMessage(req, res) {
    try {
      const userId = +req.session.idUserSession
      const chatId = +req.body.chatId
      const message = req.body.message

      if (Number.isInteger(userId)) {
       await this.#addNewMessageInDB(userId, chatId, message)
        res.json({message, userId})        
      } else {
        res.status(403).end()
      }
    } catch (err) {
      console.error(err);
      res.json({ err: 'cannot sent message' })
      return new Error(err)
    }
  }

  async #countUndeadChatsInDB(userId) {
    try {
      return await db.query(
        `SELECT DISTINCT cm.chat_id FROM chat_msg cm
        INNER JOIN chat c ON c.chat_id = cm.chat_id
        INNER JOIN chat_msg_status cms ON cm.msg_id = cms.msg_id
        WHERE cms.user_id <> $1 AND cms.is_read = false AND (c.friend_id = $1
            OR c.user_id = $1)`,
          [userId]
      )
    } catch (err) {
      console.error(err, 'cannot get unread count')
      return new Error(err)
    }
  }


  async getCountUnreadChats(req, res) {
    try {
      const userId = +req.session.idUserSession

      if (Number.isInteger(userId)) {
        const count = await this.#countUndeadChatsInDB(userId)
        res.json({countUnreadChats: count.rows})        
      } else {
        res.status(403).end()
      }
    } catch (err) {
      console.error(err);
      res.json({ err: 'cannot get count unread chats'})
      return new Error(err)
    }
  }

}

module.exports = new chatController()