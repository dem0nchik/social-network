const autorizeRouter = require('./autorize.routes')
const userRouter = require('./user.routes')
const s3FileRouter = require('./s3File.routes')
const postRouter = require('./post.routes')

module.exports = {
  autorizeRouter,
  userRouter,
  s3FileRouter,
  postRouter
}