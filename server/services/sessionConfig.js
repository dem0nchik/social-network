require('dotenv').config()
const db = require('./db')
const yn = require('yn');
const pgSession = require('connect-pg-simple')(require('express-session'))

const sessionConfig = {
  store: new pgSession({
      pool: db,
      tableName: 'session'
  }),
  name: 'SID',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      aameSite: true,
      secure: yn(process.env.SESSION_SECURE) // ENABLE ONLY ON HTTPS
}}

module.exports = sessionConfig