# Description
This is **ReverseEchoBot**. When you send some message to it, it respond with reversed text of this message. That's all!

# Instalation

Install package:
```bash
npm install acrm-telegram-bot
```

Put in the root directory file ```credentials.js``` such as:
```js
class Credentials {
  static getTelegramBotToken() {
    return "your-telegram-bot-token";
  }
}
module.exports = Credentials;
```

Run:
```bash
node index
```

That's all!