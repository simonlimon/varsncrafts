const GoogleImages = require('google-images');
const Keys = require('./_keys/search.json');
const Vision = require('@google-cloud/vision');

const axios = require('axios');
const storage = require('node-persist');

function get(res, cuisine_term) {
  get_cuisine_colors(cuisine_term, colors => {
    res.setHeader('Content-Type', 'application/json');
    res.send(colors);
  });
}

function get_cuisine_colors(cuisine_term, callback) {
  imageSearch = new GoogleImages(Keys.search, Keys.api);  
  imageSearch.search(cuisine_term).then(images => {
    let image_urls = images.map(image => image.url)
    let colors = {}
    let count = 0
    for (const i in image_urls) {
      get_colors(image_urls[i], result => {
        colors[image_urls[i]] = result;
        count++;
        if (count == image_urls.length) {
          callback(colors);
        }
      })
    }
  });
}

function get_colors(image_url, callback) {
  const vision = new Vision({
    keyFilename: './server/api/_keys/varsncrafts-cuisine-8877256aaf7e.json'
  });
  const request = {
    source: {
      imageUri: image_url
    }
  };

  vision.imageProperties(request)
    .then((results) => {
      const properties = results[0].imagePropertiesAnnotation;
      const colors = properties.dominantColors.colors;
      callback(colors);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
}

module.exports = get