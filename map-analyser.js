const fs = require('fs');
const request = require('request');

if (fs.exists('map.html')) {
  fs.unlink('map.html');
}

request('http://freecodecamp.com/map', function(error, response, body) {
  console.log('Getting data...');
})
.pipe(fs.createWriteStream('map.html'));
