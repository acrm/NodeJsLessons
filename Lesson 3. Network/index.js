var request = require('request');
var cheerio = require('cheerio');

request('http://bash.im/abysstop', function (error, response, html) {
  console.log("error:\n", error, "\n----");
  if (!error && response.statusCode == 200) {
    console.log("html\n", html, "\n----");
    var $ = cheerio.load(html);
    $('#body'/* > .quote > div.text'*/).each(function(i, element){
      console.log(element);
      //var cols = $(this).find('td');
      //console.dir(`${cols.eq(0).text()} ${cols.eq(1).text()} ${cols.eq(2).text()}`);
    });
  }
});
