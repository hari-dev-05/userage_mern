const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* POST: add user */
app.post("/users", (req, res) => {
  const { username, age } = req.body;

  if (!username || !age) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = "INSERT INTO users (username, age) VALUES (?, ?)";

  db.query(sql, [username, age], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "DB error" });
    }
    res.json({ message: "User added successfully" });
  });
});

/* GET: fetch users */
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "DB error" });
    }
    res.json(rows);
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
