const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "ruchii05",
    database: "roxiler"
});

connection.connect((err) => {
    if(err){
        console.log("Database Error:", err);
    } else {
        console.log("Database Connected Successfully");
    }
});

module.exports = connection;