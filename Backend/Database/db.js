const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adminpass",
    database: "kfc_db"
});

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("MySQL database connected successfully");
    }
});

module.exports = connection;