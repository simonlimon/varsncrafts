const axios = require('axios');
const fs = require('fs');
const request = require('request');
const sharp = require('sharp');
const uid = require('uid');

function get(res, only_meta) {
  axios.get('https://epic.gsfc.nasa.gov/api/natural').then(function (result) {

    var index = Math.floor((result.data.length / 24) * new Date().getHours())

    if (only_meta){
      res.setHeader('Content-Type', 'application/json');
      res.send(result.data[index])
      return
    }

    var date = result.data[index].date.split(' ')[0].split('-');
    var image_link = "https://epic.gsfc.nasa.gov/archive/natural/"
      + date[0] + '/' + date[1] + '/' + date[2] +
      "/png/" + result.data[0].image +'.png';
    var filepath = __dirname + '/tmp/' + result.data[index].image + '.png';

    if (!fs.existsSync(__dirname + '/tmp')){
      fs.mkdirSync(__dirname + '/tmp');
    }
    
    if (fs.existsSync(filepath)) {
      send_png(res, filepath)
    } else {
      console.log('Fetching EPIC image from NASA');
      var tmp_path = __dirname + '/tmp/' + uid() + '.png';
      var stream = request(image_link).pipe(
        fs.createWriteStream(tmp_path)
      );
      stream.on('finish', function () {
        console.log('Compressing EPIC image');
        sharp(tmp_path).resize(500).toFile(filepath).then( function () {
          fs.unlinkSync(tmp_path);
          send_png(res, filepath);
        })
      })
    }
  })
}

function send_png(res, filepath) {
  console.log('Sending EPIC image to client');
  res.sendFile(filepath)
}

module.exports = get;