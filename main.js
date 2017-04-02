var express = require('express');
var app = express();
var ws_module = require('./ws_module');
var log = '';
var player1 = ws_module("niv" , 10);
var player2 = ws_module("braz" , 0);


player1.on('addGoal',function() {
    log += ("addGoal executed to: " + this.name + 
        " current goals: " + this.goals + "<br>\n");
  });
player1.on('removeGoal',function() {
    log += ("removeGoal executed to: " + this.name + 
       " current goals: " + this.goals + "<br>\n");
  });
player2.on('addGoal',function() {
    log += ("addGoal executed to: " + this.name + 
        " current goals: " + this.goals + "<br>\n");
  });
player2.on('removeGoal',function() {
    log += ("removeGoal executed to: " + this.name + 
        " current goals: " + this.goals + "<br>\n");
  });

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