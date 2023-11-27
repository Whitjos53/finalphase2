var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

// // Mongo
// const url = "mongodb://127.0.0.1:27017";
// const dbName = "reactdata";
// const client = new MongoClient(url);
// const db = client.db(dbName);



// Mongo FINAL TEST
const url = "mongodb://127.0.0.1:27017";
const dbName = "flashcarddata";
const client = new MongoClient(url);
const db = client.db(dbName);



app.use(cors());
app.use(bodyParser.json());


const port = "8081";
const host = "localhost";


// Author: Name of the student
// ISU Netid : netid@iastate.edu
// Date :  Month day, 2023

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});


app.get("/listRobots", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const query = {};
    const results = await db
    .collection("fakedata")
    .find(query)
    .limit(100)
    .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

app.get("/:id", async (req, res) => {
    const robotid = Number(req.params.id);
    console.log("Robot to find :", robotid);

    await client.connect();
    console.log("Node connected successfully to GET-id MongoDB");
    const query = {"id": robotid };

    // const results = await db.collection("robots") //Original
    const results = await db.collection("fakedata")
        .findOne(query);

    console.log("Results :", results);
    if (!results) res.send("Not Found").status(404);
    else res.send(results).status(200);

    // const html =
    // `<h1>Hello, ${res.query.name}!</h1>
    //  <p>You are ${res.query.price} years old.</p>`;

    // res.send(html);


});



// app.get("/:id", function(req, res) {
//     const html =
//        `<h1>Hello, ${req.query.name}!</h1>
//         <p>You are ${req.query.price} years old.</p>`;
   
//     res.send(html);
//  });
 
 




app.post("/addRobot", async (req, res) => {

    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const id            = values[0];
    const name          = values[1];
    const price         = values[2];
    const description   = values[3];
    const imageUrl      = values[4];
    const flashCards    = values[5];

    console.log(id, name, price, description, imageUrl, flashCards);

    const newDocument = {
        "id" : id,
        "name" : name,
        "price" : price,
        "description" : description,
        "imageUrl" : imageUrl,
        "flashCards" : flashCards
    };

    const results = await db.collection("fakedata").insertOne(newDocument);
    res.status(200);
    res.send(results);

    // .collection("robots")
    // .find(query)
    // .limit(100)
    // .toArray();
    // console.log(results);

});

//value[] 
//const key
//imageURL