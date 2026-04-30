const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: "8765432",
database: 'test',
insecureAuth : true
});

module.exports = connection;