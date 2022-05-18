const { MongoClient, ServerApiVersion } = require("mongodb");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send({ success: true });
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sk2ow.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  await client.connect();
  const todoCollection = client.db("todo-list").collection("todos");

  app.post("/todo", async (req, res) => {
    const { todoData } = req.body;
    const result = await todoCollection.insertOne(todoData);
    res.send(result);
  });
 
};

run().catch(console.dir);

app.listen(port, () => console.log("listening at", port));
