'use strict';
var player1;
var player2;
var currentPlayer = player1;
var letter;
var userWord = document.getElementById('word');

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



function switchPlayer() {
  if(currentPlayer == player1) {
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
    //score adjust needs time left over
    Game.scores=input.length-3;
    console.log('is not broke');
    

  }
  else{
    console.log(input);
    console.log('something is broke');
    
    console.log(letter);
    var errorString = errorMesssage(input);
    insertError(errorString);
    
  }
  
});
function errorMesssage(input){
  if(!input.startsWith(letter)){
    return 'Start with ' + letter;
  }
  if(Game.wordsTyped.includes(input)){
    return 'Word already used!';
  }
  if(!listOfWords.includes(input)){
    return 'Not a word';
  }
  else{
    return 'Error Message Broke';
  }

}
function insertError(errorString){
  //may need to come back and add id to input rather than querySelector
  var inputNode = document.querySelector('input');
  var p = document.createElement('p');
  p.textContent= errorString;
  inputNode.parentElement.insertBefore(p, inputNode);
}
  
function initialize() {
  var dict = new Dictionary('English');
  new Game(dict);
  player1 = new Player(name);
  player2 = new Player(name);
  letter = dict.alphabet[Math.floor(Math.random() * dict.alphabet.length)];
  userWord.setAttribute('placeholder', letter);
}

initialize();