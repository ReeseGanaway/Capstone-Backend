require("dotenv").config();
const bcrypt = require("bcryptjs");
const { emailValidation, passwordValidation } = require("./validation");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  host: `${process.env.DB_HOST}`,
  port: process.env.DB_PORT,
  database: `${process.env.DB_DATABASE}`,
});

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

const getSpecificUser = async (request, response) => {
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

//end user table functions

//card table functions
const addCard = async (request, response) => {
  try {
    const { card_id, pokemon, type, hp } = request.body;
    const newCard = await pool.query(
      "INSERT INTO card (card_id, pokemon, type, hp) VALUES ($1, $2, $3, $4) RETURNING *",
      [card_id, pokemon, type, hp]
    );
    const newCollection = await pool.query(
      "INSERT INTO collection (card_id) VALUES ($1) RETURNING *",
      [card_id]
    );

    response.json(newCard.rows[0]);
    response.json(newCollection.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = pool;
module.exports = {
  createUser,
  login,
  addCard,
  getSpecificUser,
};
