console.log 'Initializing tumblr client...'

require 'datejs'
db     = require('../db/db')
config = require('../config/config').tumblr
tumblr = require('tumblr.js').createClient
  consumer_key:    config.consumerKey,
  consumer_secret: config.consumerSecret,
  token:           config.token,
  token_secret:    config.tokenSecret


exports.postAll = (posts, callback) ->
  for post in posts
    exports.post(post, callback)

exports.post = (post, callback) ->
  date = Date.parse(post.created_time.substring(0,19)).addHours(-4)

  if !db.Post.findOne({id: post.id}) && date.getHours() >= 2 && date.getHours() < 6
    if post.type == 'status' && (post.status_type == 'mobile_status_update' || post.status_type == 'wall_post')
      result = postQuote(post.id, post.message, date)
    if post.type == 'link' && post.status_type == 'shared_story'
      result = postLink(post.id, post.link, post.message, date)
    if post.type == 'photo'
      result = postPhoto(post.id, post.picture, post.link, date)
    else
      error = 'Facebook post unsuitable for tumblr publish'
  else
    error = 'Facebook post has already been sent to tumblr'

  callback(result, error)

postQuote = (id, quote, date) ->
  tumblr.quote config.blog, {quote: quote, date: date.toUTCString()}
  'Quote successfully sent to tumblr'

postLink  = (id, url, description, date) ->
  tumblr.link config.blog, {url: url, description: description, date: date.toUTCString()}
  'Link successfully sent to tumblr'

postPhoto = (id, source, link, date) ->
  tumblr.photo config.blog, {source: source, link: link, date: date.toUTCString()}
  'Photo successfully sent to tumblr'