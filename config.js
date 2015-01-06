var config = {
	facebook: {
		appId: '596957433673118',
		secret: '[HIDDEN]',
		access_token: '[HIDDEN]',
		root: 'https://graph.facebook.com/',
		access: 'oauth/access_token/',
		search: 'keithconallen/feed/',
		limit: '2000' },
	tumblr: {
		blog: 'keithafter2',
		consumerKey: '[HIDDEN]',
		consumerSecret: '[HIDDEN]',
		token: '[HIDDEN]',
		tokenSecret: '[HIDDEN]' },
	local: {
		file: './posts.txt' }
};

module.exports = config;
