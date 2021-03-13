const autorizeRouter = require('./autorize.routes')
const userRouter = require('./user.routes')
const s3FileRouter = require('./s3File.routes')
const postRouter = require('./post.routes')
const friendRouter = require('./friend.routes')
const infoRouter = require('./info.routes')

module.exports = {
  autorizeRouter,
  userRouter,
  s3FileRouter,
  postRouter,
  friendRouter,
  infoRouter
}