'use strice';
var events = require('events');

class Player {

    constructor(name,goals){
        this.name = name;
        this.goals = goals;
        events.EventEmitter.call(this);
    }

    addGoal(){
        this.goals++;
        this.emit('addGoal');
        //console.log("Added 1 goal to %s.", this.name);
    }

    removeGoal(){
        if(this.goals>0){
            this.goals--;
            //console.log("Remove 1 goal to %s.", this.name);
        }
        else
            console.log("this player (%s) has no goals", this.name);
        this.emit('removeGoal');
    }

    getInfo(){
        return{
            'name':this.name,
            'goals':this.goals,
        };
    }
};

Player.prototype.__proto__ = events.EventEmitter.prototype;

module.exports = function (name,goals){
    var newPlayer = new Player(name,goals);
    return newPlayer;
}
