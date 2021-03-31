const autorizeRouter = require('./autorize.routes')
const userRouter = require('./user.routes')
const googleDriveRouter = require('./googleDrive.routes')
const postRouter = require('./post.routes')
const friendRouter = require('./friend.routes')
const infoRouter = require('./info.routes')
const chatRouter = require('./chat.routes')

module.exports = [
  autorizeRouter,
  userRouter,
  googleDriveRouter,
  postRouter,
  friendRouter,
  infoRouter,
  chatRouter
]