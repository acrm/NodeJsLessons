const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const minimist = require('minimist');
const Credentials = require('./credentials');

const argv = minimist(process.argv.slice(2));

function getContent(url) {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      encoding: null
    }, 
    function (error, response, html) {
      if(error) {
        console.error(error);
        reject(error);
        return;
      }

      if (response.statusCode !== 200) {
        console.error(response);
        reject(new Error(response.statusCode));
        return;
      }

      const htmlDecoded = iconv.decode(new Buffer(html), 'win-1251').toString()
      resolve(htmlDecoded);        
    });
  });
}

async function loadBash() {
  const htmlDecoded = await getContent('http://bash.im/abysstop');
  const $ = cheerio.load(htmlDecoded);
  const max = argv.n ? Math.min(argv.n, 10) : 1;
  $('body div.quote').slice(0, max).each(function(i, quote) {
    const quoteDate = $(quote).find('div.actions span.abysstop-date').text();
    const quoteText = $(quote).find('div.text').text();
    console.log(`From ${quoteDate}:\n${quoteText}\n`);
  });
}

async function loadTranslation(text) {
  const token = Credentials.getYaTranslatorToken();
  const params = `key=${token}&lang=ru-en&text=${encodeURIComponent(text)}`;
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?${params}`;
  const json = await getContent(url);
  console.log(JSON.parse(json).text[0]);
}

if(argv._.includes('bash')) {
  loadBash();
}
else if (argv._.includes('trans')) {
  if(!argv.t) {
    console.log(`Specify '-t' paramater with following text to translate`);
    return;
  }
  loadTranslation(argv.t);
}
else {
  console.log(`Specify 'bash' or 'trans' command`);
}
