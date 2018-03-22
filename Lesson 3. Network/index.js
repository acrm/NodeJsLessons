const request = require('request');
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

request({
    url: 'http://bash.im/abysstop',
    encoding: null
  }, 
  function (error, response, html) {
    console.log("error:\n", error, "\n----");
    if (!error && response.statusCode == 200) {
      console.log("headers\n", response.headers, "\n----");
      //console.log("html\n", html, "\n----");
      var $ = cheerio.load(html);
      $('#body div.quote div.text').each(function(i, element){
        let text = $(element).text();
        text = iconv.decode(new Buffer(text), "utf-8").toString()
        console.log(text);
        //var cols = $(this).find('td');
        //console.dir(`${cols.eq(0).text()} ${cols.eq(1).text()} ${cols.eq(2).text()}`);
      });
    }
});
