const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
const compression = require("compression");
const db = require("./db");

//middleware
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(bodyParser.json());

app.post("/signup", db.createUser);

app.post("/users", db.login);

app.get("/users/:email", db.getSpecificUserByEmail);

app.get("/usersname/:username", db.getSpecificUserByUsername);

app.post("/card", db.addCard);

app.get("/cards", db.getCards);

app.get("/cards/:pokemon", db.getCardsByPokemon);

app.delete("/card/:id", db.deleteCard);

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
