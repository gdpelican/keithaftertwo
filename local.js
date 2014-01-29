var fs = require('fs');
var config = require('./config').local;
var _this = this;

exports.getPosts = function(callback) {
	console.log('Retrieving stored posts...');
	fs.readFile(config.file, 'utf8', function(error, data) {
		var posts = data.split('\r\n');
		console.log('Posts retrieved: ' + posts.length);
		callback(posts);
	});
};

exports.logResult = function(id, error, data) {
	console.log('Logging result for tumblr post...');
	if(error)
		console.log(error);
	else
		storePost(id);
		
};

var storePost = function(id) {
	console.log('Storing post ' + id + ' to local file...');
	fs.appendFile(config.file, id + '\r\n', function(error, data) {
		console.log('Post ' + id + ' successfully posted to tumblr and stored');
	});
};
