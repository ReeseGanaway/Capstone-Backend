const express = require("express");
const app = express();
const cors = require("cors");
//const pool = require("./db");
const bodyParser = require("body-parser");
const compression = require("compression");
//const db = require("./db");

//middleware
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(bodyParser.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
