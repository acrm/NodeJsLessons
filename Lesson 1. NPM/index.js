const Credentials = require('./credentials');
const TeleBot = require('telebot');
const bot = new TeleBot(Credentials.getTelegramBotToken());

bot.on('text', (msg) => msg.reply.text(msg.text.split("").reverse().join("")));
bot.start();