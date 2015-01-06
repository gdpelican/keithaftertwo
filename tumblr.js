var config = require('./config').tumblr;
var lib = require('tumblr.js');
var http = require('http');
var local = require('./local');

console.log('Initializing tumblr client...');
var tumblr = lib.createClient({
  consumer_key: config.consumerKey,
  consumer_secret: config.consumerSecret,
  token: config.token,
  token_secret: config.tokenSecret
});

exports.postQuote = function(id, quote, date) {
	console.log('Attempting to post quote ' + id + ' to tumblr... ' + date.toString('d MMM yy, HH:mm'));
	tumblr.quote(config.blog, {quote: quote, date: date.toUTCString()}, function(error, data) { local.logResult(id, error, data); });
};

exports.postLink = function(id, url, description, date) {
	console.log('Attempting to post link ' + id + ' to tumblr...' + date.toString('d MMM yy, HH:mm'));
	tumblr.link(config.blog, { url: url, description: description, date: date.toUTCString()}, function(error, data) { local.logResult(id, error, data); });
};

exports.postPhoto = function(id, source, link, date) {
	console.log('Attempting to post photo ' + id + ' to tumblr... ' + date.toString('d MMM yy, HH:mm'));
	tumblr.photo(config.blog, { source: source, link: link, date: date.toUTCString()}, function(error, data) { local.logResult(id, error, data); });
};
