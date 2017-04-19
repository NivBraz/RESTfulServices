'use strice';
var events = require('events');
var eventConfig = require('./config').events;

class Player extends events{

    constructor(name,goals){
        super();
        this.name = name;
        this.goals = goals;
        events.EventEmitter.call(this);
    }

    addGoal(){
        this.goals++;
        this.emit(eventConfig.GOAL);
        //console.log("Added 1 goal to %s.", this.name);
    }

    removeGoal(){
        if(this.goals>0){
            this.goals--;
            this.emit(eventConfig.GOAL);
        }
        else
            this.emit(eventConfig.CHECK);
    }

};

//Player.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = function (name,goals){
    var newPlayer = new Player(name,goals);
    return newPlayer;
}
