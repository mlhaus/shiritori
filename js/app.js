'use strict';

//Constructors for player, game, dictionary, settings
function Game (dictionary) {
  this.scores = [];
  this.wordsTyped = ['tiger'];
  this.dictionary = dictionary;
  this.time = '';
}
Game.players = [];

function Player (name, profilePic) {
  this.name = name;
  this.highScore = 0;
  this.profilePic = profilePic || 'img/no-image.jpg';

  Game.players.push (this);
}

function Dictionary (name) {
  this.name = name;
  this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
}
var listOfWords = ['tiger','rabbit','rhino'];

function initialize() {
  var dict = new Dictionary('English');
  new Game(dict);
  var player1 = new Player('bob');
  var player2 = new Player('name');
}

initialize();

var form= document.querySelector('form');
form.addEventListener('submit',function(event){
  event.preventDefault();
  var input=event.target.word.value;
  console.log(!wordsTyped.includes(input))
  if(listOfWords.includes(input)&&!wordsTyped.includes(input){
    ;
});