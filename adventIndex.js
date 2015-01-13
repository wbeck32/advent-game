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

var lookupTable = mapFunctions(mazeMap);
var userString;
var directionArray = [];

var initRoom = mazeMap.rooms[0];

var retrieveDirections = function(roomName) {

	if (roomName.north !== null) {
		directionArray.push('north');
	} if(roomName.south !== null) {
		directionArray.push('south')
	} if (roomName.west !== null) {
		directionArray.push('west');
	} if (roomName.east !== null) {
		directionArray.push('east');
	}

	return directionArray.join(' or ');
}


var init = function() {
	userString = "You are standing in "+initRoom.name;
	userString += ".\n There is a miniature apple tree here.\n";
	userString += "You can go "+retrieveDirections(initRoom)+".";
	userString += "\n\nEnter your choice: ";

	rl.question(userString, function(next) {
		goOn(next, initRoom.name);
	});
};

var goOn = function(nextDirection, roomName) {

	for (var key in mazeMap.rooms) {
		if (mazeMap.rooms[key]['name'] === roomName){
			var nextRoom = mazeMap.rooms[key][nextDirection];
			console.log('room: ',nextRoom);
			console.log(mazeMap.rooms.name[nextRoom]);
			//console.log(comp.createRoom(mazeMap.rooms.name[nextRoom]));
	}
}

//	var nextRoom = mazeMap.rooms[name];///
//	console.log(nextRoom);

};

init();
// //console.log(comp.createRoom(mazeMap.rooms[0]));

// var userString = "You are standing in "+lookupTable.A.name;
// userString += ".\n There is a miniature apple tree here.";
// userString += ".\n You can go ";

// rl.question(userString, function(next){
// 	console.log(next);

// });

//console.log(comp.createRoom(mazeMap.rooms[mazeMap.rooms.entrance]));
// rl.question("You are in room A. You can go  ",function(wtf){
// 	console.log('wtf: ',wtf);
// });
// var allRooms = function(mazeMap){
// 	var tmp = mazeMap.map();
// 	console.log(tmp);
// }

//allRooms(mazeMap);