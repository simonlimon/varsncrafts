const axios = require('axios');
const GoogleImages = require('google-images');
const Keys = require('./_keys/search.json');
const Vision = require('@google-cloud/vision');



function get(res, cuisine_term) {
  imageSearch = new GoogleImages(Keys.search, Keys.api);
  imageSearch.search(cuisine_term).then(images => {
    get_image_info(images[0].url, function(image_info) {
      res.setHeader('Content-Type', 'application/json');
      res.send(image_info)
    })
  });
}

function get_image_info(image_url, callback) {
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