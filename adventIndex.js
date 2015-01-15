#!/usr/bin/env node
'use strict';

var mazeMap = require('./mazeMap');
var comp = require('./lib/components.js');
var readline = require('readline');
var mapFunctions = require('./lib/map.js');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var userString;
var lookupTable = mapFunctions(mazeMap);
var directionArray = [];
var initRoom = mazeMap.rooms[0];
var nextRoom,nextDirection,tmp,index,room;

var retrieveDirections = function(roomObj) {
	directionArray = [];
	if (roomObj.north !== null) {
		directionArray.push('north');
	} if(roomObj.south !== null) {
		directionArray.push('south');
	} if (roomObj.west !== null) { 
		directionArray.push('west');
	} if (roomObj.east !== null) {
		directionArray.push('east');
	}
	//remove dupes from array before passing it
	return directionArray.join(' or ');
};


var findNameObj = function(roomName) {
	for (room in mazeMap.rooms) {
		if(mazeMap.rooms[room].name === roomName) {
			return mazeMap.rooms[room];
		}
	}
};
var tmp2 = {"rooms":[]};
var init = function() {

	tmp2.rooms.push(initRoom);
	console.log(require('../jsi-gamelib/').map(tmp2));

	userString = "You are standing in "+initRoom.name;
	userString += ".\n"+initRoom.description+"\n";
	userString += "You can go "+retrieveDirections(initRoom)+".";
	userString += "\n\nEnter your initial choice: ";

	rl.question(userString, function(next) {
		goOn(next, initRoom);
	});
};

	
var goOn = function(nextDirection, currentRoom) {
	for (index in mazeMap.rooms) {
		if (mazeMap.rooms[index].name === currentRoom.name){
			nextRoom = mazeMap.rooms[index][nextDirection];
		}
	}
	
	nextRoom = findNameObj(nextRoom);
	tmp2.rooms.push(nextRoom);

	console.log(require('../jsi-gamelib/').map(tmp2));
	userString = "You are standing in "+nextRoom.name;
	userString += ".\n"+nextRoom.description+"\n";
	userString += "You can go "+retrieveDirections(nextRoom)+".";
	userString += "\n\nEnter your moving on choice: ";

	rl.question(userString, function(next) {
		goOn(next, nextRoom);
	});
};


init();