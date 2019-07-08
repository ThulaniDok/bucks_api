var mysql = require('mysql');

// database connection details
 con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "buck_boost"
  });

  // connect to database
 con.connect(function(err) {
    if (err) {
        throw err
    }
    console.log("DB Connected!")
});


// View team squad
getTeam = function (req, res) {
    con.query('SELECT * FROM TeamSquad', function (err, rows, fields) {
        if(!err) {
            res.send(rows)
        }
        console.log(err)
    })
};

// View specific player details
exports: getPlayer = function (req, res) {
    con.query('SELECT * FROM TeamSquad WHERE name = ?', [req.params.player], function (err, rows, fields) {
        if(!err) {
            res.send(rows)
        }
        console.log(err)
    })
};

// Delete player from team squad
exports: deletePlayer = function (req, res) {
    con.query('DELETE FROM TeamSquad WHERE name = ?', [req.params.player], function (err, rows, fields) {
        if(!err) {
            res.send('Deleted successfully!')
        }
        console.log(err)
    });
};

//Update existing player
exports: editPlayer = function (req, res) {
    let plyr_name = req.body.name;
    let plyr_surname = req.body.surname;
    let plyr_pos = req.body.position;
    let plyr_age = req.body.age;
    
    if (!plyr_name) {
        console.log(plyr_pos)
        return res.status(400).send({error: plyr, message: "please provide player and player name"});
    }
    con.query('UPDATE `TeamSquad` SET `surname`=?,`position`=?,`age`=? where `name`=?', [plyr_surname, plyr_pos, plyr_age, plyr_name ], function (err, results, fields){
        if(err) throw err;
        return res.send({err: false, data: results, message: "Player has been updated."})
    });
};

// Add new player to team squad
exports: addPlayer = function (req, res) {
    let plyr = req.body.plyr;
    console.log(req.body);
    if (!plyr) {
        return res.status(400).send({ error:true, message: 'Please provide player' });
    }
    console.log(plyr);
    con.query('insert into TeamSquad set ?', plyr, function (err, result) {
        if(!err) {
            res.send('Created successfully!')
        }
        console.log(err)
    })
};