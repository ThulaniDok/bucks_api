const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const players = require('./services/player');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', "PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({});
    }
    next();
});


// App home page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/README.md') 
});

// View team squad
app.get('/team', getTeam);

// View specific player details
app.get('/team/:player', getPlayer);

// Delete player from team squad
app.delete('/team/:player', deletePlayer);

//Update existing player
app.put('/team', editPlayer);

// Add new player to team squad
app.post('/team', addPlayer);

//port to listen to
app.listen(3002);