const readline = require('readline');
const randomInt  = require('random-int');

var input = readline.createInterface({
  input: process.stdin, 
  output: process.stdout 
});
console.log('Head or Tail?\n\t1 - Head\n\t2 - Tail');
input.on('line', function (str) {
  const choice = parseInt(str);
  if(choice != 1 && choice != 2) {
    console.log(choice);
    return;
  }
  const result = randomInt(1, 2);
  if(choice != result) {
    console.log(`You're loose!`);
  }
  else {
    console.log(`You're win!`);
  }
});