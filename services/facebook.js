var https = require('https');
var config = require('../config/config').facebook;

exports.read = function(callback) {
  console.log('Reading from facebook...');
  get(config.access_token, config.root, config.search, config.limit, callback);
};

var get = function(token, host, path, limit, callback) {
  var buffer = '';
  var path = host + path + "?limit=" + limit + "&access_token=" + token;
  var request = https.get(path, function(response){
  response.setEncoding('utf8');
  response.on('data', function(chunk) { buffer += chunk; });
  response.on('end',  function() {
    var data = json(buffer);
    if(typeof data.data !== 'undefined') {
      callback(data.data); }
    else if (typeof data.error !== 'undefined')
      console.log(data.error.message);
    else
      console.log('An unknown error occurred.');
    });
  })
  .on('error', function(e) { console.log(e.message); })
  .end();
};

var json = function(str) {
  eval("var value = (" + str + ")");
  return value;
};
