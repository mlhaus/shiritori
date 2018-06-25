'use strict';

//Constructors for player, game, dictionary, settings
function Player (name, profilePic) {
  this.name = name;
  this.highScore = 0;
  this.profilePic = profilePic || 'img/no-image.jpg';

  Game.players.push (this);
}

function Dictionary (name, listOfWords, alphabet) {
  this.name = name;
  this.listOfWords = [];
  this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
}

function Game (scores, wordsTyped, dictionary, time, players) {
  this.scores = [];
  this.wordsTyped = [];
  this.dictionary = dictionary;
  this.time = time;
  this.players = [];
}

function Settings (secPerTurn, minCharacters, minScore, maxTimeAllowed) {
  this.secPerTurn = secPerTurn;
  this.minCharacters = minCharacters;
  this.minScore = minScore;
  this.maxTimeAllowed = maxTimeAllowed;
}

function initialize(name) {
  var player1 = new Player(name);
  var player2 = new Player(name);

}