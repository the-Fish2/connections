const express = require('express')
const bodyParser = require('body-parser')
const fse = require('fs-extra')

const prevConnections = require('./connectionsDb.json')

const app = express()
const jsonParser = bodyParser.json()

app.use(express.static('public'))

function loadPastGame(req, res) {
    const routeParams = req.params
    const name = routeParams.name
    const currGame = prevConnections[name]

    // console.log(currGame)

    res.json(currGame)
}

app.get('/pastGames/:name', loadPastGame)

async function saveGame(req, res) {

    console.log("called")

    const routeParams = req.params;

    const inputInfo = req.body

    prevConnections[routeParams.title] = {
        "dimensions":inputInfo.dimensions,
        "words":inputInfo.words,
        "answer_key":inputInfo.answer_key
    }

    await fse.writeJSON('./connectionsDb.json', prevConnections)

    res.json({success: true})
}

app.post('/saveGame/:title', jsonParser, saveGame)

function displayPastGames(req, res) {
    let gameTitles = []
    for (const item in prevConnections) {
        // console.log(item)
        gameTitles.push(item)
    }
    res.json({"gameTitles": gameTitles})
}

app.get('/pastGames', displayPastGames)

app.listen(3000, function() {
    console.log("Listening!")
})