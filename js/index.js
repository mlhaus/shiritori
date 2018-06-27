/* globals Papa */

var listOfWords;

// Load list of states into <ul id="words">
// function loadWords(words) {
//   var wordsEl = document.getElementById('words');
//   for(var i = 0; i < words.length; i++) {
//     var word = words[i];

//     var listItemEl = document.createElement('li');
//     listItemEl.innerText = word;
//     wordsEl.appendChild(listItemEl);
//   }
// }

function loadWords(words) {
  listOfWords = words;
}

// Load data on window load
function loadData() {
  var csvUrl = 'assets/dictionary-2col-quotes.csv';
  Papa.parse(csvUrl, {

    // Download CSV data from csvUrl
    download: true,

    // Use CSV header row
    header: true,

    // When CSV data are available...
    complete: function(results) {
      // console.log('CSV loaded:', results.data);

      // results.data is an array of objects
      // object keys are from CSV header row
      loadWords(results.data);
    }
  });
}

window.addEventListener('load', loadData);