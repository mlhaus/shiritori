'use strict';
var player1;
var player2;
var currentPlayer = player1;


//Constructors for player, game, dictionary, settings

function Player (name, profilePic) {
  this.name = name;
  this.highScore = 0;
  this.profilePic = profilePic || 'img/no-image.jpg';

  Game.players.push (this);
}

function Dictionary (name) {
  this.name = name;
  this.listOfWords = [];
  this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
}

function Game (dictionary) {
  this.scores = [];
  this.wordsTyped = [];
  this.dictionary = dictionary;
  this.time = '';
  this.players = [];
}

function initialize() {
  var dict = new Dictionary('English');
  new Game(dict);
  player1 = new Player(name);
  player2 = new Player(name);
}

function switchPlayer() {
  if(currentPlayer == player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}