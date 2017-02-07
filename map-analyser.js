const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

function processHtml() {
  console.log('Reading file...');

  const $ = cheerio.load(fs.readFileSync('map.html', 'utf8'));

  console.log('Done.');

  console.log('Parsing html...');

  var fccMap = {};

  $('h2 a').each(function(index, element) {
    var mainTitle = element.children[1].data;

    fccMap[mainTitle] = {}

    $(element.attribs.href + ' h3 a').each(function(index, element) {
      var subTitle = element.children[1].data;

      fccMap[mainTitle][subTitle] = {};

      var time = parseInt(element.next.children[0].data.match(/\d+/)[0]);

      if (element.next.children[0].data.search('hours') != -1) {
        time *= 60;
      }

      fccMap[mainTitle][subTitle].minutes = time;
    });
  });

  console.log('Done.');

  console.log(fccMap);
}

if (process.argv.indexOf('-f') != -1) {
  console.log(process.argv.indexOf('-f'));

  if (fs.exists('map.html')) {
    fs.unlinkSync('map.html');
  }

  console.log('Getting data...');

  request('http://freecodecamp.com/map')
    .pipe(
      fs.createWriteStream('map.html')
      .on('close', function() {
        console.log('Done.');

        processHtml();
      })
    );
} else {
  processHtml();
}
