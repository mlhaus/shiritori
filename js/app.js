'use strict';
var dict;
var isPaused;
var gameTimer;
var roundTimer;
var customRoundTimer;
var currentGameTime;
var currentRoundTime;
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
var timePoints;
var success;
var toggled=false;
var settingsButton=document.getElementById('settingsToggle');
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
var player1Name= document.getElementById('player1Name');
var player2Name= document.getElementById('player2Name');
var instructionsButton = document.getElementById('instructionsButton');
var aboutButton = document.getElementById('aboutUsButton');

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
  this.longest = "";
  Game.players.push (this);
}

function Dictionary (name) {
  this.name = name;
  this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
}

function isGameOver (){
  return game.scores[0] >= minScoreToWin || game.scores[1] >= minScoreToWin;
}



function timer(gameTime, roundTime) {
  gameTimer = gameTime;
  roundTimer = roundTime;
  var t = setInterval(function () {
    if (gameTimer <= 0) {
      endTime();
      clearInterval(t);
    }
    else if (roundTimer <= 0 || success===true || isGameOver()){
      if(roundTimer<=0){
        listMaker5000('PASS');
      }
      if(!isGameOver()){
        switchPlayer();
      }
      currentGameTime = gameTimer;
      clearInterval(t);
    }
    else {
      if (isPaused === true) {
        currentGameTime = gameTimer;
        currentRoundTime = roundTimer;
        clearInterval(t);
      }
      else {
        --gameTimer;
        minutes = parseInt(gameTimer / 60);
        seconds = parseInt(gameTimer % 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        gameTimerElement.textContent = minutes + ':' + seconds;

        --roundTimer;
        countDownElement.textContent=roundTimer;
        timePoints=roundTimer;
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
    var winnerString = player1Name.value + ' Wins';
  }
  else if (game.scores[0] < game.scores[1]) {
    winnerString = player2Name.value + ' Wins';
  }
  else {
    winnerString = 'It\'s a Tie';
  }
  winner.textContent = winnerString;
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
  --gameTimer;
  minutes = parseInt(gameTimer / 60);
  seconds = parseInt(gameTimer % 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  gameTimerElement.textContent = minutes + ':' + seconds;
  currentRoundTime = customRoundTimer;
  countDownElement.textContent=currentRoundTime;
  timer(gameTimer, currentRoundTime);
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
    highScore();
  }
}

function highScore() {
  var d = new Date();
  var dateString = d.toLocaleDateString();
  var hsTable = JSON.parse(localStorage.getItem('highScore')) || [];
  if (game.scores[0] > minScoreToWin) {
    var tableRow = [player1Name.value, dateString, Math.floor(gameTimer/60)+':'+gameTimer%60, player1.longest];
    hsTable.push(tableRow);
    localStorage["highScore"] = JSON.stringify(hsTable);
  }
  if (game.scores[1] > minScoreToWin) {
    tableRow = [player2Name.value, dateString, gameTimer, player2.longest];
    hsTable.push(tableRow);
    localStorage["highScore"] = JSON.stringify(hsTable);
  }

}

function listIncludes(input) {
  var result = listOfWords.filter(item => item.word === input);
  return result.length > 0;
}

player1Name.addEventListener('focusin', function(){
  player1Name.value='';

});
player1Name.addEventListener('focusout', function(){
  if(player1Name.value === '')
    player1Name.value = 'Player 1';
});

player2Name.addEventListener('focusin', function(){
  player2Name.value='';

});
player2Name.addEventListener('focusout', function(){
  if(player2Name.value === '')
    player2Name.value = 'Player 2';
});



var form= document.querySelector('form');
form.addEventListener('submit',function(event){
  event.preventDefault();
  var input=event.target.word.value;
  input = input.toLowerCase();
  var inputResult = listIncludes(input);
  if(inputResult&&!Game.wordsTyped.includes(input)&&input.startsWith(letter)){
    Game.wordsTyped.push(input);
    letter=input.charAt(input.length-1);
    userWord.setAttribute('placeholder', letter);
    if (currentPlayer.longest.length < input.length) {
      currentPlayer.longest = input;
      console.log(currentPlayer.longest.length)
    }
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
  var ul;
  if(currentPlayer===player1){
    ul=document.getElementById('player1words');
  }
  if(currentPlayer===player2){
    ul=document.getElementById('player2words');
  }
  var li=document.createElement('li');
  li.textContent=input;
  ul.insertBefore(li, ul.firstChild);
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
  player1 = new Player(player1Name.value);
  player2 = new Player(player2Name.value);
  p1ScoreElement.firstElementChild.textContent= player1.name;
  p2ScoreElement.firstElementChild.textContent= player2.name;
  currentPlayer = player1;
  p2ScoreElement.classList.remove('current');
  p1ScoreElement.classList.add('current');
  p1WordsUsedElement.textContent = '';
  p2WordsUsedElement.textContent = '';
  minNumbCharacters = document.getElementById('minCharRequired').value;
  document.getElementById('word').minLength=minNumbCharacters;
  minScoreToWin = document.getElementById('scoreToWin').value;
  letter = dict.alphabet[Math.floor(Math.random() * dict.alphabet.length)];
  success = false;
  isPaused = false;
  userWord.setAttribute('placeholder', letter);
  welcomeScreen.classList.add('hidden');
  pauseScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
  gameTimer = 300;
  customRoundTimer = document.getElementById('secPerTurn').value;
  minutes = parseInt(gameTimer / 60);
  seconds = parseInt(gameTimer % 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  gameTimerElement.textContent = minutes + ':' + seconds;
  countDownElement.textContent=customRoundTimer;
  timer(gameTimer, customRoundTimer);
}

function toggleSettings(){
  if(toggled===false){
    document.getElementsByClassName('settings')[0].classList.remove('hidden');
    document.getElementsByClassName('settings')[1].classList.remove('hidden');
    document.getElementsByClassName('settings')[2].classList.remove('hidden');
    document.getElementsByClassName('settings')[3].classList.remove('hidden');
    document.getElementsByClassName('settings')[4].classList.remove('hidden');
    toggled=true;
  }
  else{
    document.getElementsByClassName('settings')[0].classList.add('hidden');
    document.getElementsByClassName('settings')[1].classList.add('hidden');
    document.getElementsByClassName('settings')[2].classList.add('hidden');
    document.getElementsByClassName('settings')[3].classList.add('hidden');
    document.getElementsByClassName('settings')[4].classList.add('hidden');
    toggled=false;
  }
}


function pauseGame() {
  pauseScreen.classList.remove('hidden');
  isPaused = true;
}

function continueGame(){
  isPaused = false;
  timer(currentGameTime, currentRoundTime);
  pauseScreen.classList.add('hidden');
}

function loadInstructions(){
  location.href='instructions.html';
}

function loadAbout(){
  location.href='about.html';
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
settingsButton.addEventListener('input',toggleSettings);
playRestartNewButtons[1].addEventListener('click', playGame);
window.addEventListener('load', initialize);

playRestartNewButtons[2].addEventListener('click', playGame);
instructionsButton.addEventListener('click', loadInstructions);
aboutButton.addEventListener('click', loadAbout);