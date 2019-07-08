var mysql = require('mysql');

// database connection details
exports: con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "buck_boost"
  });

  // connect to database
exports: con.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("DB Connected!")
});