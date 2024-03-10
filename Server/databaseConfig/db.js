const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Database connected');
});
module.exports = {connection};
