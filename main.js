var express = require('express');
var app = express();
var ws_module = require('./ws_module');
var log = '';
var player1 = ws_module("niv" , 10);
var player2 = ws_module("braz" , 0);
var eventConfig = require('./config').events;


function displayGoal(){
  console.log(`the player ${this.name} current goals are ${this.goals}`);
}
function logGoal(){
  log += (`the player ${this.name} current goals are ${this.goals} <br>`);
}
function checkGoal(){
  log += (`the player ${this.name} has no goals to remove! <br>`);
  console.log(`the player ${this.name} has no goals to remove!`);
}
player1.on(eventConfig.GOAL, displayGoal);
player1.on(eventConfig.GOAL, logGoal);
player1.on(eventConfig.CHECK, checkGoal);
player2.on(eventConfig.GOAL, displayGoal);
player2.on(eventConfig.GOAL, logGoal);
player2.on(eventConfig.CHECK, checkGoal);




app.get('/', function (req, res) {
   player2.downCheck()
     .then(() => {
        player2.removeGoal();
     })
     .catch((err) =>{
        player2.emit(eventConfig.CHECK);
     });
   player1.downCheck()
     .then(() => {
        player1.removeGoal();
     })
     .catch((err) =>{
        player1.emit(eventConfig.CHECK);
     });
   player2.addGoal();
   player2.addGoal();
   player1.addGoal();
   player2.downCheck()
     .then(() => {
        player2.removeGoal();
     })
     .catch((err) =>{
        player2.emit(eventConfig.CHECK);
     });
   res.send(log);
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening at port:%s", port)

})

//console.log(log);