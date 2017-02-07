const fs = require('fs');
const request = require('request');

if (process.argv.indexOf('-f')) {
  if (fs.exists('map.html')) {
    fs.unlinkSync('map.html');
  }

  console.log('Getting data...');

  request('http://freecodecamp.com/map')
    .pipe(
      fs.createWriteStream('map.html')
      .on('close', function() {
        console.log('Done.');
      })
    );
}
