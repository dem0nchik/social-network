require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const upload = require('express-fileupload');

const sessionConfig = require('./services/sessionConfig')
const routes = require('./routes')

const PORT = process.env.PORT || 8080
const app = express()


app.use(session(sessionConfig))

app.use(express.json())
app.use(upload())

app.use(cors({origin: process.env.BASE_URL, credentials: true}))

app.use('/api', routes.autorizeRouter)
app.use('/api', routes.userRouter)
app.use('/api', routes.s3FileRouter)
app.use('/api', routes.postRouter)
app.use('/api', routes.friendRouter)
app.use('/api', routes.infoRouter)


app.listen(PORT, () => console.log('Server is run on port', PORT))