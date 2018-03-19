const readAnswer = require('readline-once')();
const randomInt  = require('random-int');

const variants = ['h', 't'];
const checkWin = (choice) => {
  const result = variants[randomInt(0, 1)];
  return choice == result;
}
const start = async () => {
  while(true){
    const choice = await readAnswer('Head or Tail? h - Head, t - Tail, q - Quit: ');
    switch(choice) {
      case 'h':
      case 't':
        if(checkWin(choice)){
          console.log(`You're win!`);
        }
        else {
          console.log(`You're loose!`);
        }
      break;
      case 'q': return;
      default: console.log('Incorrect input, try again');
    }
  }
}

start();
