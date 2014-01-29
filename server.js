var http = require("http");
var facebook = require('./facebook');
var local = require('./local');
var date = require('./date');
var tumblr = require('./tumblr');

var filter = function(data) { 
	local.getPosts(function(posts) {
		for (var i = 0; i < data.length; i++) {
			var current = data[i];
			var date = Date.parse(current.created_time.substring(0,19)).addHours(-4);
			
			if(posts.indexOf(current.id) == -1 && date.getHours() >= 2 && date.getHours() < 6) {
				switch(current.type) {
					case 'status':
						switch(current.status_type) {
							case 'mobile_status_update':
							case 'wall_post':
								tumblr.postQuote(current.id, current.message, date); 
						};
						break;
					case 'photo':
						tumblr.postPhoto(current.id, current.picture, current.link, date); break;
					case 'link':
						switch(current.status_type) {
							case 'shared_story':
								tumblr.postLink(current.id, current.link, current.message, date);
						};
						break;
				}
			}
		}
	});
};

facebook.read(filter);
