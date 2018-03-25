const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

function getCheerioDom(url) {
  return new Promise((resolve, reject) => {
    request({
      url: url,
      encoding: null
    }, 
    function (error, response, html) {
      if(error) {
        reject(error);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(response.statusCode));
        return;
      }

      const htmlDecoded = iconv.decode(new Buffer(html), 'win-1251').toString()
      const dom = cheerio.load(htmlDecoded);
      resolve(dom);        
    });
  });
}

async function loadBash() {
  const $ = await getCheerioDom('http://bash.im/abysstop');
  $('body div.quote').each(function(i, quote) {
    const quoteDate = $(quote).find('div.actions span.abysstop-date').text();
    const quoteText = $(quote).find('div.text').text();
    console.log(`From ${quoteDate}:\n${quoteText}\n`);
  });
}

if(argv._.includes('bash')) {
  loadBash();
}
else if (argv._.includes('trans')) {
  console.log('Яндекс');
}
else {
  console.log('Incorrect input');
}