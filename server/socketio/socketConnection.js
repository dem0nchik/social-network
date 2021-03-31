const setUserOnlineStatus = require('./setUserOnlineStatus/setUserOnlineStatus')
const {debounce} = require('../utilits/utilits')

const connection = async (socket) => {
  const userId = socket.request.session.idUserSession

  if (userId) {
    debounce(async () => {
      await setUserOnlineStatus(userId, true)
    }, 1000)()

    socket.join(`user${userId}`)

    socket.on('CHAT:JOIN', (chatId) => {
      socket.join(`chat${chatId}`)
      socket.to(`chat${chatId}`).emit('CHAT:NEW_JOIN', {userId})
    })

    socket.on('MESSAGE:TYPING', ({isTyping, chatId }) => {
      socket.to(`chat${chatId}`).emit('USER:TYPING', {
        userId, isTyping
      })
    })

    socket.on('MESSAGE:ADD', (dataToSocket) => {
      const {chatId, userId, message, interlocutorId, profileImg, name} = dataToSocket

      socket.to(`chat${chatId}`).emit('MESSAGE:NEW', {
        userId, message
      })
      
      socket.to(`user${interlocutorId}`).emit('INTERLOCUTOR:NEW_MESSAGE', {
        userId, message, chatId, profileImg, name
      })
    })


    socket.on('disconnect', () => {
      debounce(async () => {
        await setUserOnlineStatus(userId, false)
      }, 1000)()
    })
  }
}

module.exports = connection