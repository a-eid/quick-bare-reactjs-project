var axios = require('axios');

var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
module.exports = function (options, callback) {
  if (!options.key) {
    throw new Error('Youtube Search expected key, received undefined');
  }

  var params = {
    part: 'snippet',
    key: options.key,
    q: options.term,
    type: 'video'
  };

  return axios.get(ROOT_URL, { params: params })
};
