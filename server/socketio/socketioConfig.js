require('dotenv').config()

module.exports = {
  cors: {
    origin: process.env.BASE_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
}