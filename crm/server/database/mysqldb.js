import mysql from 'mysql2/promise'
import dotenv from 'dotenv/config'

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT
});

export default pool