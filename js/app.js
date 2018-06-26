'use strict';
var dict;
var minNumbCharacters;
var game;
var player1;
var player2;
var currentPlayer;
var letter;
var userWord = document.getElementById('word');
var welcomeScreen = document.getElementById('welcome');
var pauseScreen = document.getElementById('pause');
var gameOverScreen = document.getElementById('game_over');
var playButton = document.getElementById('playButton');
var continueButton = document.getElementById('continueButton');
var restartButton = document.getElementById('restartButton');
var newGameButton = document.getElementById('newGameButton');
var highScoreButton = document.getElementById('highScoreButton');
var pauseButton = document.getElementById('pauseButton');
var p1ScoreElement =document.querySelector('#player1Score h4');
var p2ScoreElement =document.querySelector('#player2Score h4');
var p1Score;
var p2Score;

function getFakeWords() {
  var arr = [];
  for(var i = 97; i <= 122; i++) {
    for(var j = 97; j <= 122; j++) {
      arr.push(String.fromCharCode(i) + 'xx'+ String.fromCharCode(j));
    }
  }
  return arr;
}


//Constructors for player, game, dictionary, settings
function Game (dictionary) {
  this.scores = [];
  this.dictionary = dictionary;
  this.time = '';
}
Game.wordsTyped = [];
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
var listOfWords = getFakeWords();

function changeScore(lengthOfWord) {
  // TODO ADD THE SECONDS REMAINING TO PARAMETER LIST
  if(currentPlayer === player1) {
    p1Score += lengthOfWord - minNumbCharacters;
    
    console.log(p1Score);
  } else {
    p2Score += lengthOfWord - minNumbCharacters;
    console.log(p2Score);
  }
}

function switchPlayer() {
  if(currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

var form= document.querySelector('form');
form.addEventListener('submit',function(event){
  event.preventDefault();
  var input=event.target.word.value;
  if(listOfWords.includes(input)&&!Game.wordsTyped.includes(input)&&input.startsWith(letter)){
    listOfWords.splice(listOfWords.indexOf(input),1);
    Game.wordsTyped.push(input);
    letter=input.charAt(input.length-1);
    changeScore(input.length);
    Game.scores=input.length-3;
    console.log('is not broke');
  }
  else{
    console.log('something is broke');
  }
  
});
  
function playGame() {
  dict = new Dictionary('English');
  game = new Game(dict);
  player1 = new Player(name);
  player2 = new Player(name);
  currentPlayer = player1;
  minNumbCharacters = 3;
  p1Score = 0;
  p2Score = 0;
  var letterNum = Math.floor(Math.random() * dict.alphabet.length);
  letter = dict.alphabet[letterNum];
  userWord.setAttribute('placeholder', letter);
  welcomeScreen.classList.add("hidden");
  pauseScreen.classList.add("hidden");
  
}

function pauseGame() {
  // TODO Stop Timer Function
  pauseScreen.classList.remove("hidden");
}

function continueGame(){
  // TODO Continue Timer Function
  pauseScreen.classList.add("hidden");
}

function initialize() {
  welcomeScreen.classList.remove("hidden");
  pauseScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  
}

playButton.addEventListener("click", playGame);
pauseButton.addEventListener("click", pauseGame);
continueButton.addEventListener("click", continueGame);
restartButton.addEventListener("click", playGame);
window.addEventListener("load", initialize);