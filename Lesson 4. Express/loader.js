const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const Credentials = require('./credentials');

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

async function loadBash(count) {
  console.log('loadBash');
  const htmlDecoded = await getContent('http://bash.im/abysstop');
  //console.log(htmlDecoded);
  const $ = cheerio.load(htmlDecoded);
  const max = count ? Math.min(count, 10) : 1;
  const result = $('body div.quote').slice(0, max).map(function(i, quote) {
    const quoteDate = $(quote).find('div.actions span.abysstop-date').text();
    const quoteText = $(quote).find('div.text').text();
    return {
      quoteDate, 
      quoteText
    };
  }).get();
  console.log(result);
  return result;
}

async function loadTranslation(text) {
  const token = Credentials.getYaTranslatorToken();
  const params = `key=${token}&lang=ru-en&text=${encodeURIComponent(text)}`;
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?${params}`;
  const json = await getContent(url);
  return {
    variants: JSON.parse(json).text
  };
}

module.exports = {loadBash, loadTranslation};
