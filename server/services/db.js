require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: 5432
})

module.exports = pool