const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "pizzaria",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

app.get("/pizzas", (req, res) => {
  const { price, limit } = req.query;

  let sql = "SELECT * FROM pizzas";

  if (price) {
    sql += ` WHERE price = ${Number(price)}`;
  }

  if (limit) {
    sql += ` LIMIT ${Number(limit)}`;
  }

  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving pizzas");
    } else {
      res.send(results);
    }
  });
});

app.post("/pizzas", (req, res) => {
  const pizzaReq = req.body;

  if (!pizzaReq.name || !pizzaReq.price) {
    res.status(400).send("Name or price missing");
  } else {
    const pizza = {
      name: pizzaReq.name,
      price: pizzaReq.price,
      image: pizzaReq.image || "",
      description: pizzaReq.description || "",
    };

    connection.query("INSERT INTO pizzas SET ?", pizza, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error inserting pizza");
      } else {
        res.status(200).send("Pizza registered successfully");
      }
    });
  }
});

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

process.on("SIGINT", () => {
  console.log("Stopping server...");
  connection.end((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    server.close(() => {
      console.log("Server stopped");
      process.exit(0);
    });
  });
});
