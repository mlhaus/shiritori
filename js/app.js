'use strict';
var dict;
var isPaused;
var currentTime;
var gameTimer;
var roundTimer;
var minutes;
var seconds;
var gameTimerElement = document.querySelector('#time');
var countDownElement = document.getElementById('countDown');
var minNumbCharacters;
var minScoreToWin;
var game;
var player1;
var player2;
var currentPlayer;
var letter;
var currentCountDown;
var timePoints;
var success;
var t1;
var t2;
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
var p1WordsUsedElement = document.getElementById('player1words');
var p2WordsUsedElement = document.getElementById('player2words');


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


function startTimer(duration) {
  gameTimer = duration;
  t1 = setInterval(function () {
    if (gameTimer <= 0) {
      endTime();
      clearInterval(t2);
      clearInterval(t1);
    }
    else {
      if (isPaused === true) {
        currentTime = gameTimer;
        clearInterval(t1);
      }
      else {
        --gameTimer;
        minutes = parseInt(gameTimer / 60);
        seconds = parseInt(gameTimer % 60);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        gameTimerElement.textContent = minutes + ':' + seconds;
      }
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

function countDown(duration){
  roundTimer = duration;
  t2 = setInterval(function(){
    if(roundTimer <= 0 || success===true || isGameOver()){
      if(roundTimer<=0){
        listMaker5000('PASS');
      }
      if(!isGameOver()){
        switchPlayer();
      }
      clearInterval(t2);
    }
    else {
      if(isPaused===true){
        currentCountDown=roundTimer;
        clearInterval(t2);
      }
      else {
        --roundTimer;
        countDownElement.textContent='00:'+roundTimer;
        timePoints=roundTimer;
      }
    }
  },1000);
}

function switchPlayer() {
  if(currentPlayer === player1) {
    currentPlayer = player2;
    p2ScoreElement.classList.add('current');
    p1ScoreElement.classList.remove('current');
    clearsInput();
  } else {
    currentPlayer = player1;
    p2ScoreElement.classList.remove('current');
    p1ScoreElement.classList.add('current');
    clearsInput();
  }
  success = false;
  currentCountDown = 15;
  countDownElement.textContent='00:'+currentCountDown;
  countDown(currentCountDown);
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
    clearInterval(t1);
    clearInterval(t2);
  }
}

function listIncludes(input) {
  var result = listOfWords.filter(item => item.word === input);
  return result.length > 0;
}

var form= document.querySelector('form');
form.addEventListener('submit',function(event){
  event.preventDefault();
  var input=event.target.word.value;
  var inputResult = listIncludes(input);
  if(inputResult&&!Game.wordsTyped.includes(input)&&input.startsWith(letter)){
    Game.wordsTyped.push(input);
    letter=input.charAt(input.length-1);
    userWord.setAttribute('placeholder', letter);
    listMaker5000(input);
    changeScore(input.length);
    var errorString = '';
    insertError(errorString);
    clearsInput();
    success=true;
  }
  else{
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
  Game.wordsTyped = [];
  p1ScoreElement.lastElementChild.textContent = game.scores[0];
  p2ScoreElement.lastElementChild.textContent = game.scores[1];
  player1 = new Player("Player 1");
  player2 = new Player("Player 2");
  currentPlayer = player1;
  p2ScoreElement.classList.remove('current');
  p1ScoreElement.classList.add('current');
  p1WordsUsedElement.textContent = '';
  p2WordsUsedElement.textContent = '';
  minNumbCharacters = 3;
  minScoreToWin = 100;
  letter = dict.alphabet[Math.floor(Math.random() * dict.alphabet.length)];
  success = false;
  isPaused = false;
  userWord.setAttribute('placeholder', letter);
  welcomeScreen.classList.add('hidden');
  pauseScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  gameTimer = 300;
  roundTimer = 15;
  minutes = parseInt(gameTimer / 60);
  seconds = parseInt(gameTimer % 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  gameTimerElement.textContent = minutes + ':' + seconds;
  countDownElement.textContent='00:'+roundTimer;
  startTimer(gameTimer);
  countDown(roundTimer);
}


function pauseGame() {
  pauseScreen.classList.remove('hidden');
  isPaused = true;
}

function continueGame(){
  isPaused = false;
  startTimer(currentTime);
  countDown(currentCountDown);
  pauseScreen.classList.add('hidden');
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
