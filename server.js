const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const jsonParser = bodyParser.json();
app.use(express.static('public'));

// MongoDB connection string
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db; //hi!

// Connect to MongoDB
async function connectToMongo() {
 try {
   await client.connect();
   db = client.db("connectionsDb");
   console.log("Connected to MongoDB");
 } catch (error) {
   console.error("Failed to connect to MongoDB", error);
   process.exit(1);
 }
}
connectToMongo();

async function loadPastGame(req, res) {
 const name = req.params.name;
 try {
   const game = await db.collection('games').findOne({ name: name });
   res.json(game);
 } catch (error) {
   res.status(500).json({ error: "Failed to load game" });
 }
}
app.get('/pastGames/:name', loadPastGame);

async function saveGame(req, res) {
 const title = req.params.title;
 const inputInfo = req.body;
 const gameData = {
   name: title,
   dimensions: inputInfo.dimensions,
   words: inputInfo.words,
   answer_titles: inputInfo.answer_titles,
   answer_key: inputInfo.answer_key
 };
 try {
   await db.collection('games').updateOne(
     { name: title },
     { $set: gameData },
     { upsert: true }
   );
   res.json({ success: true });
 } catch (error) {
   res.status(500).json({ error: "Failed to save game" });
 }
}
app.post('/saveGame/:title', jsonParser, saveGame);

async function displayPastGames(req, res) {
 try {
   const games = await db.collection('games').find({}, { projection: { name: 1 } }).toArray();
   const gameTitles = games.map(game => game.name);
   res.json({ gameTitles: gameTitles });
 } catch (error) {
   res.status(500).json({ error: "Failed to retrieve game titles" });
 }
}
app.get('/pastGames', displayPastGames);

app.listen(3000, function() {
 console.log("Listening on port 3000!");
});

// const express = require('express')
// const bodyParser = require('body-parser')
// const fse = require('fs-extra')

// const prevConnections = require('./connectionsDb.json')

// const app = express()
// const jsonParser = bodyParser.json()

// app.use(express.static('public'))

// function loadPastGame(req, res) {
//     const routeParams = req.params
//     const name = routeParams.name
//     const currGame = prevConnections[name]

//     // console.log(currGame)

//     res.json(currGame)
// }

// app.get('/pastGames/:name', loadPastGame)

// async function saveGame(req, res) {

//     console.log("called")

//     const routeParams = req.params;

//     const inputInfo = req.body

//     prevConnections[routeParams.title] = {
//         "dimensions":inputInfo.dimensions,
//         "words":inputInfo.words,
//         "answer_titles":inputInfo.answer_titles,
//         "answer_key":inputInfo.answer_key
//     }

//     await fse.writeJSON('./connectionsDb.json', prevConnections)

//     res.json({success: true})
// }

// app.post('/saveGame/:title', jsonParser, saveGame)

// function displayPastGames(req, res) {
//     let gameTitles = []
//     for (const item in prevConnections) {
//         // console.log(item)
//         gameTitles.push(item)
//     }
//     res.json({"gameTitles": gameTitles})
// }

// app.get('/pastGames', displayPastGames)

// app.listen(3000, function() {
//     console.log("Listening!")
// })

// /*
// const express = require('express');
// const bodyParser = require('body-parser');
// const { MongoClient, ObjectId } = require('mongodb');

// const app = express();
// const jsonParser = bodyParser.json();

// app.use(express.static('public'));

// // MongoDB connection string
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);
// let db;

// // Connect to MongoDB
// async function connectToMongo() {
//   try {
//     await client.connect();
//     db = client.db("connectionsDb");
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//     process.exit(1);
//   }
// }

// connectToMongo();

// async function loadPastGame(req, res) {
//   const name = req.params.name;
//   try {
//     const game = await db.collection('games').findOne({ name: name });
//     res.json(game);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to load game" });
//   }
// }

// app.get('/pastGames/:name', loadPastGame);

// async function saveGame(req, res) {
//   const title = req.params.title;
//   const inputInfo = req.body;

//   const gameData = {
//     name: title,
//     dimensions: inputInfo.dimensions,
//     words: inputInfo.words,
//     answer_titles: inputInfo.answer_titles,
//     answer_key: inputInfo.answer_key
//   };

//   try {
//     await db.collection('games').updateOne(
//       { name: title },
//       { $set: gameData },
//       { upsert: true }
//     );
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save game" });
//   }
// }

// app.post('/saveGame/:title', jsonParser, saveGame);

// async function displayPastGames(req, res) {
//   try {
//     const games = await db.collection('games').find({}, { projection: { name: 1 } }).toArray();
//     const gameTitles = games.map(game => game.name);
//     res.json({ gameTitles: gameTitles });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve game titles" });
//   }
// }

// app.get('/pastGames', displayPastGames);

// app.listen(3000, function() {
//   console.log("Listening on port 3000!");
// });
// */