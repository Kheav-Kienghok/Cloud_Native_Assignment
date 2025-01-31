// STEP-1 : IMPORT MySQL2 PACKAGE
const mysql = require('mysql2');

// Database Connection URL
const dbconnection = mysql.createConnection({
    host: "localhost",
    user: "admin2",
    password: "admin2",
    database: "studentdb",
});

// STEP-2 : ESTABLISH CONNECTION WITH MONGODB DATABASE THROUGH MONGOOSE
// err is callback function Parameter. ARROW OPERATOR.
dbconnection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// STEP-3 : EXPORT MODULE dbconnection because we need it in other JS file
module.exports = dbconnection;