/**
 * Dependencies
 */
const readline = require('readline');
const readlineOnce = require('readline-once');
const randomInt  = require('random-int');
const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs');

/**
 * Logging
 */
const streams = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const readAnswer = readlineOnce(streams);
const logStatistics = (choice, result) => {
  if(!argv.stat) return;
  const record = `${choice}:${result}\n`;
  fs.appendFile(argv.stat, record, (err) => {if (err) throw err;});
}

/**
 * Game logic
 */
const variants = ['h', 't'];
const flipCoin = () => variants[randomInt(0, 1)];
const checkWin = (choice) => flipCoin() == choice;
const checkChoice = (choice) => {
  switch(choice) {
    case 'h':
    case 't':
      const isWin = checkWin(choice);
      logStatistics(choice, isWin);
      if(isWin) {
        console.log(`You're win!`);
      }
      else {
        console.log(`You're lose!`);
      }
    break;
    default: console.log('Incorrect input, try again');
  } 
}

/**
 * Game loop
 */
const loop = async () => {
  while(true){
    const choice = await readAnswer('Head or Tail? h - Head, t - Tail, q - Quit: ');
    switch(choice) {
      case 'q': return;
      default: checkChoice(choice); break;
    }
  }
}

/**
 * Entry point
 */
if(argv.choice) {
  checkChoice(argv.choice);
}
else {
  loop();
}
streams.close();
