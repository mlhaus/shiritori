'use strict';

//Constructors for player, game, dictionary, settings
function Player (name, highScore, viewStat, profilePic) {
  this.name = name;
  this.highScore = highScore;
  this.profilePic = profilePic;

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

