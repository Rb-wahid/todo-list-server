const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
require("dotenv").config;
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send({ success: true });
});

app.listen(port, () => console.log("listening at", port));
