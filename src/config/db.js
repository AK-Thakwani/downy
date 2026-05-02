const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

let dbConfig = {};

if (process.env.DATABASE_URL) {
  const { URL } = require('url');
  const dbUrl = new URL(process.env.DATABASE_URL);
  dbConfig = {
    host: dbUrl.hostname,
    user: decodeURIComponent(dbUrl.username),
    password: decodeURIComponent(dbUrl.password),
    database: dbUrl.pathname.slice(1),
    port: dbUrl.port ? parseInt(dbUrl.port, 10) : 3306,
    ssl: {
      rejectUnauthorized: false // Required for cloud providers like Aiven
    }
  };
} else {
  dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'test',
  };
}

const pool = mysql2.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
