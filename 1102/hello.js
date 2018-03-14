const ansi = require('ansi'); // CommonJS
const cursor = ansi(process.stdout);
cursor.beep();
