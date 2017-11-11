const express = require('express');
const path = require('path');

// API imports
const epic_image = require('./api/epic_image');
const sentry = require('./api/sentry');
const cuisine_colors = require('./api/cuisine_colors');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'html');

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Fetch latest EPIC image of earth
app.get('/api/epic_image', (req, res) => {
  epic_image(res, false);
});

// Fetch metadata of latest EPIC image of earth
app.get('/api/epic_image/meta', (req, res) => {
  epic_image(res, true);
});

// Fetch Sentry asteroid data
app.get('/api/sentry', (req, res) => {
  sentry(res);
});

// Cuisine colors data
app.get('/api/cuisine_colors/:cuisine', (req, res) => {
  cuisine_colors(res, req.params.cuisine);
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
