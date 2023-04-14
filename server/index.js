const db = require("./db.json");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

app.get("/pizzas", (req, res) => {
  const { price, limit } = req.query;
  let filteredPizzas = db;

  if (price) {
    filteredPizzas = filteredPizzas.filter(
      (pizza) => pizza.price === Number(price)
    );
  }

  if (limit) {
    filteredPizzas = filteredPizzas.slice(0, Number(limit));
  }

  res.send(filteredPizzas);
});

app.post("/pizzas", (req, res) => {
  const pizzaReq = req.body;

  if (!pizzaReq.name || !pizzaReq.price) {
    res.status(400).send("Name or price missing");
  } else {
    const pizza = {};
    pizza.id = (db.length + 1).toString();
    pizza.name = pizzaReq.name;
    pizza.price = pizzaReq.price;
    pizza.image = pizzaReq.image || "";
    pizza.description = pizzaReq.description || "";

    db.push(pizza);

    // Write the updated data to the db.json file
    fs.writeFile("./db.json", JSON.stringify(db), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing to database");
      } else {
        res.status(200).send("Pizza registered successfully");
      }
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
