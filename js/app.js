'use strict';
var dict;
var isPaused;
var currentTime;
var display;
var minNumbCharacters;
var minScoreToWin;
var game;
var player1;
var player2;
var currentPlayer;
var letter;
var currentCountDown;
var success=false;
var timePoints;
var userWord = document.getElementById('word');
var welcomeScreen = document.getElementById('welcome');
var pauseScreen = document.getElementById('pause');
var gameOverScreen = document.getElementById('game_over');
var continueButton = document.getElementById('continueButton');
var playRestartNewButtons = document.querySelectorAll('.playButton');
var highScoreButton = document.getElementById('highScoreButton');
var pauseButton = document.getElementById('pauseButton');
var p1ScoreElement = document.getElementById('player1Score');
var p2ScoreElement = document.getElementById('player2Score');
var winner = document.getElementById('winner');


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
  this.scores = [0, 0];
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

function isGameOver (){
  return game.scores[0] >= minScoreToWin || game.scores[1] >= minScoreToWin;
}


function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  isPaused = false;
  var t = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = minutes + ':' + seconds;

    if (isPaused === true) {
      clearInterval(t);
      currentTime = timer;
    }
    else if (--timer < 0) {
      clearInterval(t);
      endTime();
    }
  }, 1000);
}

function endTime() {
  gameOverScreen.classList.remove('hidden');
  winnerStatment();
}
function winnerStatment(){
  if (game.scores[0] > game.scores[1]) {
    var winnerString = 'Player 1 Wins';
  }
  else if (game.scores[0] < game.scores[1]) {
    winnerString = 'Player 2 Wins';
  }
  else {
    winnerString = 'It\'s a Tie';
  }
  winner.textContent = winnerString;
}

function passMessage() {
  var inputWordString = 'PASS';
  listMaker5000(inputWordString);
}

console.log(passMessage)

function countDown(time){
  success=false;
  isPaused=false;
  var countDownInterval=window.setInterval(function(){
    document.getElementById('countDown').textContent='00:'+time;
    if(isPaused===true){
      clearInterval(countDownInterval);
      currentCountDown=time;
    }
    else if(success===true){
      clearInterval(countDownInterval);
      switchPlayer();
    }
    else if(--time<0){
      clearInterval(countDownInterval);
      passMessage();
      switchPlayer();
    }
    timePoints=time;
  },1000);
}

function switchPlayer() {
  if(currentPlayer === player1) {
    currentPlayer = player2;
    p2ScoreElement.classList.add('current');
    p1ScoreElement.classList.remove('current');
  } else {
    currentPlayer = player1;
    p2ScoreElement.classList.remove('current');
    p1ScoreElement.classList.add('current');
  }
  countDown(15);
}

function changeScore(lengthOfWord) {
  // TODO ADD THE SECONDS REMAINING TO PARAMETER LIST
  if(currentPlayer === player1) {
    game.scores[0] += lengthOfWord - minNumbCharacters + timePoints;
    p1ScoreElement.lastElementChild.textContent = game.scores[0];
  } else {
    game.scores[1] += lengthOfWord - minNumbCharacters + timePoints;
    p2ScoreElement.lastElementChild.textContent = game.scores[1];
  }
  var gameOver = isGameOver();
  if (gameOver){
    gameOverScreen.classList.remove('hidden');
    winnerStatment();
  }
}

function listIncludes(input) {
  var result = listOfWords.filter(item => item.word === input);
  return [result.length > 0, result.index];
}

var form= document.querySelector('form');
form.addEventListener('submit',function(event){
  event.preventDefault();
  var input=event.target.word.value;
  var inputResult = listIncludes(input);
  if(inputResult[0]&&!Game.wordsTyped.includes(input)&&input.startsWith(letter)){
    listOfWords.splice(inputResult[1],1);
    Game.wordsTyped.push(input);
    letter=input.charAt(input.length-1);
    userWord.setAttribute('placeholder', letter);
    listMaker5000(input);
    changeScore(input.length);
    var errorString = '';
    insertError(errorString);
    clearsInput();
    success=true;
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

function listMaker5000(input){
  if(currentPlayer===player1){
    var ul=document.getElementById('player1words');
    var li=document.createElement('li');
    li.textContent=input;
    ul.appendChild(li);
  }
  if(currentPlayer===player2){
    ul=document.getElementById('player2words');
    li=document.createElement('li');
    li.textContent=input;
    ul.appendChild(li);
  }
}

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
  var p = document.getElementById('errorMessage');
  p.textContent= errorString;
}

function playGame() {
  game = new Game(dict);
  p1ScoreElement.lastElementChild.textContent = game.scores[0];
  p2ScoreElement.lastElementChild.textContent = game.scores[1];
  player1 = new Player(name);
  player2 = new Player(name);
  currentPlayer = player1;
  p2ScoreElement.classList.remove('current');
  p1ScoreElement.classList.add('current');
  minNumbCharacters = 3;
  minScoreToWin = 100;
  letter = dict.alphabet[Math.floor(Math.random() * dict.alphabet.length)];
  userWord.setAttribute('placeholder', letter);
  welcomeScreen.classList.add('hidden');
  pauseScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  var fiveMinutes = 60 * 5;
  display = document.querySelector('#time');
  startTimer(fiveMinutes, display);
  countDown(15);
}


function pauseGame() {
  pauseScreen.classList.remove('hidden');
  isPaused = true;
}

function continueGame(){
  pauseScreen.classList.add('hidden');
  display = document.querySelector('#time');
  startTimer(currentTime, display);
  countDown(currentCountDown);
}

function initialize() {
  welcomeScreen.classList.remove('hidden');
  pauseScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  dict = new Dictionary('English');
  loadData();
}


playRestartNewButtons[0].addEventListener('click', playGame);
pauseButton.addEventListener('click', pauseGame);
continueButton.addEventListener('click', continueGame);
//TODO CLEAR LIST ON RESET
playRestartNewButtons[1].addEventListener('click', playGame);
window.addEventListener('load', initialize);
playRestartNewButtons[2].addEventListener('click', playGame);
