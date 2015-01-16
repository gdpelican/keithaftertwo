console.log 'Initializing tumblr client...'

require 'datejs'
db     = require('../db/db')
config = require('../config/config').tumblr
tumblr = require('tumblr.js').createClient
  consumer_key:    config.consumerKey,
  consumer_secret: config.consumerSecret,
  token:           config.token,
  token_secret:    config.tokenSecret


exports.postAll = (posts) ->
  for post in posts
    exports.post(post)

exports.post = (post) ->
  date = Date.parse(post.created_time.substring(0,19)).addHours(-4)

  if !db.Post.findOne({id: post.id}) && date.getHours() >= 2 && date.getHours() < 6
    if post.type == 'status' && (post.status_type == 'mobile_status_update' || post.status_type == 'wall_post')
      postQuote(post.id, post.message, date)
    if post.type == 'link' && post.status_type == 'shared_story'
      postLink(post.id, post.link, post.message, date)
    if post.type == 'photo'
      postPhoto(post.id, post.picture, post.link, date)

postQuote = (id, quote, date) ->
  console.log "Attempting to post quote #{id} to tumblr... #{date.toString('d MMM yy, HH:mm')}"
  tumblr.quote config.blog, {quote: quote, date: date.toUTCString()}
  new db.Post({id: id}).save

postLink  = (id, url, description, date) ->
  console.log "Attempting to post link #{id} to tumblr... #{date.toString('d MMM yy, HH:mm')}"
  tumblr.link config.blog, {url: url, description: description, date: date.toUTCString()}
  new db.Post({id: id}).save

postPhoto = (id, source, link, date) ->
  console.log('Attempting to post photo ' + id + ' to tumblr... ' + date.toString('d MMM yy, HH:mm'));
  tumblr.photo config.blog, {source: source, link: link, date: date.toUTCString()}
  new db.Post({id: id}).save
