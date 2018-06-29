'use strict';

var highScore;

function renderCart() {
  loadFromStorage();
  if(highScore[0]){
    clearTable();
    renderTable();
  }
}

function loadFromStorage(){
  highScore = JSON.parse(localStorage.getItem('highScore')) || [];
}

function clearTable(){
  var tbody= document.querySelector('tbody');
  tbody.innerHTML='';
}

function renderTable(){
  for (var i=0;i<highScore.length;i++){
    var tbody= document.querySelector('tbody');
    var tr=document.createElement('tr');
    for(var j=0;j<highScore[i].length;j++){
      var td=document.createElement('td');
      td.textContent=highScore[i][j];
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
}
window.addEventListener('load',renderCart);