const mysql = require("mysql2");

let db;

function connectWithRetry() {
  db = mysql.createConnection({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "userage_db",
  });

  db.connect((err) => {
    if (err) {
      console.log("MySQL not ready, retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("MySQL connected");
    }
  });
}

connectWithRetry();

module.exports = db;
