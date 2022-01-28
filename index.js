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

app.get("/", function (req, res) {
  res.send("WORKING!");
});

app.post("/signup", db.createUser);

app.post("/users", db.login);

app.get("/users/:email", db.getSpecificUserByEmail);

app.get("/usersname/:username", db.getSpecificUserByUsername);

app.post("/card", db.addCard);

app.get("/card", db.getCards);

app.get("/cards/:pokemon", db.getCardsByPokemon);

app.get("/card/:card_id", db.getCardById);

app.delete("/card/:id", db.deleteCard);

app.post("/collection", db.addCardToCollection);

//app.get("/collection/:collection_id", db.getCollection);

app.get("/collection/:collection_id", function (request, response) {
  try {
    const { collection_id } = request.params;
    const userCollection = await pool.query(
      "SELECT * FROM collection WHERE collection_id = $1",
      [collection_id]
    );

    response.json(userCollection.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/collection/:collection_id", db.deleteCollectionItem);

app.listen(process.env.PORT || 5000, () => {
  console.log("server has started on port 5000");
});
