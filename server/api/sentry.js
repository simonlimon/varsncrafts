const axios = require('axios');

function get(res) {
  var base_url = 'https://ssd-api.jpl.nasa.gov/sentry.api?all=1&ip-min='
  var min_ip = '1e-3'
  var url = base_url + min_ip

  axios.get(url).then(function (result) {
    res.setHeader('Content-Type', 'application/json');
    res.send(result.data);
  })

}

module.exports = get