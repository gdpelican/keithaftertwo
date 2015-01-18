console.log 'Initializing facebook client...'

request   = require 'request'
config    = require('../config/config').facebook

feedPath  = ->
  "#{config.root}#{config.feedPath}?access_token=#{accessToken()}&limit=#{config.limit}"
accessToken = ->
  "#{config.appId}|#{config.appSecret}"

exports.read = (options = {}, success, failure) ->
  console.log(feedPath())
  request feedPath(), (error, response, body) ->
    if error?
      failure(error)
    else
      json = JSON.parse(body)
      if      json.error?  then failure(json.error)
      else                      success(json.data)
