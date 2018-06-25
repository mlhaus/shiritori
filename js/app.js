// include the Node.js File System module
var fs = require('fs');
var text = fs.readFileSync('../assets/dictionary.txt');
var textByLine = text.split('\n');

for(var i = 0; i < 10; i++) {
  console.log(textByLine[i]);
}