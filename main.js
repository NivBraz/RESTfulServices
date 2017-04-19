var express = require('express');
var app = express();
var ws_module = require('./ws_module');
var log = '';
var player1 = ws_module("niv" , 10);
var player2 = ws_module("braz" , 0);
var eventConfig = require('./config').events;


function displayGoal(){
  console.log(`the player ${this.name} current goals are ${this.goals}\n`);
}
function logGoal(){
  log += (`the player ${this.name} current goals are ${this.goals} <br>\n`)
}
function checkGoal(){
  if(this.goals<=0)
    log += (`the player ${this.name} has no goals to remove! <br>\n`)
}

player1.on(eventConfig.GOAL, logGoal);
player1.on(eventConfig.CHECK, checkGoal);
player2.on(eventConfig.GOAL, logGoal);
player2.on(eventConfig.CHECK, checkGoal);

player2.removeGoal();
player1.removeGoal();
player2.addGoal();
player2.addGoal();
player1.addGoal();
player2.removeGoal();


app.get('/', function (req, res) {
   res.send(log);
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

//console.log(log);