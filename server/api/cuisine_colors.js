const axios = require('axios');
const GoogleImages = require('google-images');
const Keys = require('./_keys.json');

function get(res) {
  this.imageSearch = new GoogleImages(Keys.search, Keys.api);
  
  this.imageSearch.search('Nutella').then(images => {
    res.setHeader('Content-Type', 'application/json');
    res.send({ images })
  });
}

module.exports = get