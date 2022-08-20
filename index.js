const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s1xa63s.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run(){
  try{
    await client.connect();
    const servicesCollection = client.db("edTech").collection("services");
    const programsCollection = client.db("edTech").collection("programs");
     app.get("/services", async (req, res) => {
       const query = {};
       const cursor = servicesCollection.find(query);
       products = await cursor.toArray();
       res.send(products);
     });
     app.get("/programs", async (req, res) => {
       const query = {};
       const cursor = programsCollection.find(query);
       products = await cursor.toArray();
       res.send(products);
     });

  }
  finally{

  }
  console.log("db connected");

}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
