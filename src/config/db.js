const mysql2 = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Support for both local and Cloud (Aiven) databases
const dbConfig = process.env.DATABASE_URL ? {
  uri: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for most cloud providers like Aiven
  }
} : {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'test',
};

const pool = mysql2.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
