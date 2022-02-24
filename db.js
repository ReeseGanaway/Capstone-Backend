require("dotenv").config();
const bcrypt = require("bcryptjs");
const { emailValidation, passwordValidation } = require("./validation");
const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

// const pool = new Pool({
//   user: `${process.env.DB_USER}`,
//   password: `${process.env.DB_PASSWORD}`,
//   host: `${process.env.DB_HOST}`,
//   port: process.env.DB_PORT,
//   database: `${process.env.DB_DATABASE}`,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

//user table functions

const createUser = async (request, response) => {
  try {
    const { userName, email, password } = request.body;
    let errors = {};

    if (!emailValidation(email)) {
      errors.email = "Email is not valid";
    }

    if (!passwordValidation(password)) {
      errors.password = "Password is not valid";
    }

    const isEmailInUse = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (isEmailInUse.rows.length > 0) {
      errors.email = "Email is already in use";
    }

    if (Object.keys(errors).length > 0) {
      return response.status(400).json(errors);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [userName, email, hashedPassword]
    );

    response.json(newUser.rows[0]);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    let errors = {};

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      response.status(400).json({ error: "Email not registered" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      errors.password = "Password is incorrect";
    }

    if (Object.keys(errors).length > 0) {
      return response.status(400).json(errors);
    }

    response.json({ success: true, data: user.rows[0] });
  } catch (error) {
    response.status(200).json({ error: error.message });
  }
};

const getSpecificUserByEmail = async (request, response) => {
  try {
    const { email } = request.params;
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    response.json(users.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const getSpecificUserByUsername = async (request, response) => {
  try {
    const { username } = request.params;
    const users = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    response.json(users.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

//end user table functions

//card table functions
const addCard = async (request, response) => {
  try {
    const { card_id, pokemon, type, hp, image } = request.body;
    const newCard = await pool.query(
      "INSERT INTO card (card_id, pokemon, type, hp, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [card_id, pokemon, type, hp, image]
    );
    /*const newCollection = await pool.query(
      "INSERT INTO collection (card_id) VALUES ($1) RETURNING *",
      [card_id]
    );*/

    response.json(newCard.rows[0]);
    //response.json(newCollection.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const getCards = async (request, response) => {
  try {
    const allCards = await pool.query("SELECT * FROM card");
    response.json(allCards.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getCardsByPokemon = async (request, response) => {
  try {
    const { pokemon } = request.params;
    allCardsForPokemon = await pool.query(
      "SELECT * FROM card WHERE pokemon = $1",
      [pokemon]
    );
    response.json(allCardsForPokemon.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteCard = async (request, response) => {
  try {
    const { id } = request.params;
    const deleteCard = await pool.query("DELETE FROM card WHERE card_id = $1", [
      id,
    ]);
    response.json("Card was removed from the list!");
  } catch (err) {
    console.error(err.message);
  }
};

const getCardById = async (request, response) => {
  try {
    const { card_id } = request.params;
    const card = await pool.query("SELECT * FROM card WHERE card_id = $1", [
      card_id,
    ]);

    response.json(card.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

//Start collection table functions
const addCardToCollection = async (request, response) => {
  try {
    const { collection_id, card_id } = request.body;
    const newCollection = await pool.query(
      "INSERT INTO collection (collection_id, card_id) VALUES ($1, $2) RETURNING *",
      [collection_id, card_id]
    );

    response.json(newCollection.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const getCollection = async (request, response) => {
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
};

const deleteCollectionItem = async (request, response) => {
  try {
    const { id } = request.params;
    const deleteCard = await pool.query(
      "DELETE FROM collection WHERE card_id = $1",
      [id]
    );
    response.json("Card was removed from the list!");
  } catch (err) {
    console.error(err.message);
  }
};

// const getCollection = async (request, response) => {
//   try {
//     const { collection_id } = request.params;
//     const collection = await pool.query(
//       "SELECT * FROM collection WHERE collection_id = $1",
//       [collection_id]
//     );
//     response.json(collection.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// };

module.exports = pool;
module.exports = {
  createUser,
  login,
  addCard,
  getSpecificUserByEmail,
  getSpecificUserByUsername,
  getCards,
  getCardsByPokemon,
  deleteCard,
  addCardToCollection,
  getCollection,
  getCardById,
  deleteCollectionItem,
};
