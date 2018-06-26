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
var p1ScoreElement =document.getElementById('player1Score');
var p2ScoreElement =document.getElementById('player2Score');
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
  //    Game.scores=input.length-3;
  if(currentPlayer === player1) {
    p1Score += lengthOfWord - minNumbCharacters;
    p1ScoreElement.lastElementChild.textContent = p1Score;
  } else {
    p2Score += lengthOfWord - minNumbCharacters;
    p2ScoreElement.lastElementChild.textContent = p2Score;
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
    userWord.setAttribute('placeholder', letter);
    changeScore(input.length);
    var errorString = '';
    insertError(errorString);
    clearsInput();
    console.log('is not broke');
  }
  else{
    console.log(input);
    console.log('something is broke');
    
    console.log(letter);
    errorString = errorMesssage(input);
    insertError(errorString);
    
  }
  
});
function errorMesssage(input){
  if(!input.startsWith(letter)){
    clearsInput();
    return 'Start with ' + letter;
  }
  if(Game.wordsTyped.includes(input)){
    clearsInput();
    return 'Word already used!';
  }
  if(!listOfWords.includes(input)){
    return 'Not a word';
  }
  else{
    return 'Error Message Broke';
  }

}
function clearsInput(){
  var inputTag = document.getElementById('word');
  inputTag.value = '';
}
function insertError(errorString){
  //may need to come back and add id to input rather than querySelector

  var p = document.getElementById('errorMessage');
  p.textContent= errorString;
  
}
  
function playGame() {
  dict = new Dictionary('English');
  game = new Game(dict);
  player1 = new Player(name);
  player2 = new Player(name);
  currentPlayer = player1;
  minNumbCharacters = 3;
  p1Score = 0;
  p2Score = 0;
  letter = dict.alphabet[Math.floor(Math.random() * dict.alphabet.length)];
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