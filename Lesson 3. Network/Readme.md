# Description
This is **ConsoleWebGrabber**. You can run it to get information from one of the web services.
It version 1.0.0 supported following services:
* Bash.im - provide current set of funny quotes from the web
* Yandex.Translate - translates sentences from Russian to English

# Installation

Install package:
```bash
> npm install acrm-web-grabber
```

Put in the root directory file ```credentials.js``` such as:
```js
class Credentials {
  static getYaTranslatorToken() {
    return "your-yandex-translate-api-token";
  }
}
module.exports = Credentials;
```

# Usage
Run:
```bash
> node index [command] [parameter]
```

Supports folowing commands:
* ```bash``` - get list of quotes from Bash.im. Has optional parameter ```-n``` - count of quotes to be listed. Default is ```1```, maximum is ```10```.
Example:
```bash
> node index bash -n 5
```
* ```trans``` - get translation of given text from Yandex.Translate. Has obligate parameter ```-t``` - text to be translated. 
Example:
```bash
> node index trans -t "Привет мир!"
```

# Future enhancements
* Line breaks saving for 'bash' quotes 
