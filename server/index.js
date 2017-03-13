const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const request = require("request");

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'html');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Fetch latest EPIC image of earth
app.get('/api/epic_image', function (req, res) {

  axios.get('https://epic.gsfc.nasa.gov/api/natural').then(function (result) {
    var date = result.data[0].date.split(' ')[0].split('-');
    var image_link = "https://epic.gsfc.nasa.gov/archive/natural/"
      + date[0] + '/' + date[1] + '/' + date[2] +
      "/png/" + result.data[0].image +'.png';

    if (!fs.exists('server/tmp')){
      fs.mkdir('server/tmp');
    }

    var filepath = 'server/tmp/' + result.data[0].image + '.png'

    function send_png () {
      console.log('Serving png');
      fs.readFile(filepath, function(err, data) {
        if (err) {
          res.status(500)
          res.render('error', { error: err })
        } else {
          res.writeHead(200, {'Content-Type': 'image/jpeg'});
          res.end(data);
        }
      })
    }

    if (!fs.exists(filepath)) {
      send_png()
    } else {
      var stream = request(image_link).pipe(
        fs.createWriteStream(filepath)
      );

      stream.on('finish', send_png)
    }

  });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
