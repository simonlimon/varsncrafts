const GoogleImages = require('google-images');
const Vision = require('@google-cloud/vision');

const axios = require('axios');
const storage = require('node-persist');

const vision = new Vision({
  credentials: {
    private_key: process.env.GCLOUD_PRIV_KEY,
    client_email: process.env.GCLOUD_CLIENT_EMAIL
  }
});

function get(res, cuisine_term) {
  res.setHeader('Content-Type', 'application/json');
  cuisine_term = cuisine_term.toLowerCase();
  storage.init({ dir: './server/api/tmp/storage' }).then(() => {
    storage.getItem(cuisine_term).then(colors => {
      if (colors === undefined) {
        // console.log('Item not cached')
        fetch_cuisine_colors(cuisine_term, colors => {
          // console.log('Fetched and cached')
          storage.setItem(cuisine_term, colors);
          res.send(colors);
        });
      } else {
        // console.log('Item cached')
        res.send(colors);
      }
    });
  });
}

function fetch_cuisine_colors(cuisine_term, callback) {
  imageSearch = new GoogleImages(
    process.env.GOOGLE_SEARCH_KEY,
    process.env.GOOGLE_API_KEY
  );
  imageSearch.search(cuisine_term + ' cuisine').then(images => {
    let image_urls = images.map(image => image.url);
    let colors = {};
    let count = 0;
    for (const i in image_urls) {
      fetch_image_colors(image_urls[i], result => {
        if (result) {
          colors[image_urls[i]] = result;
        }
        count++;
        if (count == image_urls.length) {
          callback(colors);
        }
      });
    }
  });
}

function fetch_image_colors(image_url, callback) {
  const request = {
    source: {
      imageUri: image_url
    }
  };

  vision
    .imageProperties(request)
    .then(results => {
      const properties = results[0].imagePropertiesAnnotation;
      const colors = properties.dominantColors.colors;
      callback(colors);
    })
    .catch(err => {
      console.error('ERROR:', err);
      callback();
    });
}

module.exports = get;
