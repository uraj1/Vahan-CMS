const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Mysql Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ortho.me@10",
  database: "vahan",
  authPlugin: 'mysql_native_password'
});

db.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected");
});

// creating table if not exists

const createTable = `CREATE TABLE IF NOT EXISTS entity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    mobile_number VARCHAR(15),
    date_of_birth DATE
)`;

db.query(createTable, (err, result_) => {
  if (err) throw err;
  console.log("Table created or exists already");
});

// CURD operations

// Read function
app.get("/api/entity", (req, res) => {
  const sql = "SELECT * FROM entity";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create function
app.post("/api/entity", (req, res) => {
  const sql = "INSERT INTO entity SET ?";
  const entity = req.body;
  db.query(sql, entity, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Update function
app.put("/api/entity/:id", (req, res)=>{
    const sql = 'UPDATE entity SET ? WHERE id = ?';
    const { id } = req.params;
    const updatedItems = req.body;
    db.query(sql, [updatedItems, id], (err, result)=>{
        if(err) throw err;
        res.send(result);
    });
});

// Delete function
app.delete("/api/entity/:id", (req,res)=>{ 
    const sql = 'DELETE FROM entity WHERE id = ?';
    const { id } = req.params;
    db.query(sql,id, (err, result)=>{
        if (err) throw err;
        res.send(result);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
