const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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

  app.get("/todo", async (req, res) => {
    const result = await todoCollection.find({}).toArray();
    res.send(result);
  });

  app.put("/todo", async (req, res) => {
    const { id, isComplete } = req.body;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        isComplete,
      },
    };
    const result = await todoCollection.updateOne(filter, updateDoc, options);
    res.send(result);
  });

  app.put("/todo/update", async (req, res) => {
    const { id, title, description, isComplete } = req.body.todoData;
    const filter = { _id: ObjectId(id) };
    const options = { upsert: false };
    const updateDoc = {
      $set: {
        title,
        description,
        isComplete,
      },
    };
    const result = await todoCollection.updateOne(filter, updateDoc, options);
    res.send(result);
  });

  app.delete("/todo/:id", async (req, res) => {
    const { id } = req.params;
    const query = { _id: ObjectId(id) };

    const result = await todoCollection.deleteOne(query);

    res.send(result);
  });
};

run().catch(console.dir);

app.listen(port, () => console.log("listening at", port));
// 6285743c7e7048e97e5d18b0
