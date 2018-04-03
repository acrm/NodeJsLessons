# Description
This is **WebGrabber**, instrumented with *Express* framework. It can proxy for you some web services, thet you can choose from web-form. 

# Instalation

Install package:
```bash
> npm install acrm-express-grabber
```

Put in the root directory file ```credentials.js``` such as:
```js
class Credentials {
  static getYaTranslatorToken() {
    return "your-ya-translate-token";
  }
}
module.exports = Credentials;
```

Run:
```bash
> node index
```

That's all!
