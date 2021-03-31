require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http').createServer(app)

const socketioConfig = require('./socketio/socketioConfig')
const io = require('socket.io')(http, socketioConfig)

const cors = require('cors')
const upload = require('express-fileupload')

const sessionMiddleware = require('./services/sessionMiddleware')
const routes = require('./routes')

const socketConnection = require('./socketio/socketConnection')

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || 'localhost'

app.use(sessionMiddleware)

app.use(express.json())
app.use(upload())
app.use(cors({origin: process.env.BASE_URL, credentials: true}))

app.use('/api', routes)


io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next)
})

io.on('connection', socketConnection)

http.listen(PORT, HOST, () => console.log('Server is run on ', HOST + ':' + PORT))