require('dotenv').config();

const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

dbConnection.connect(err => {
    if (err) {
        console.errror('Error when connecting to the database: ', err.message);
        process.exit(1);
    }
    console.log("Connection established to MySQL Database was successfull")
});

module.exports = dbConnection;

