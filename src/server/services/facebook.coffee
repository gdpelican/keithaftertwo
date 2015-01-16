https  = require 'https'
config = require('../config/config').facebook

exports.read = (callback) ->
  console.log 'Reading from facebook...'
  get config.access_token, config.root, config.search, config.limit, callback

get = (token, host, path, limit, callback) ->
  buffer = ''
  path = "#{host}#{path}?limit=#{limit}&access_token=#{token}"
  request = https.get path, (response) ->
    response.setEncoding 'utf8'
    response.on 'data', (chunk) ->
      buffer += chunk
    response.on 'end', ->
      data = json buffer
      if      data.data?  then callback data.data
      else if data.error? then console.log data.error.message
      else                     console.log 'An unknown error occurred'
  .on('error', (e) -> console.log(e.message)
  .end()

json = (str) ->
  eval "var value = (#{str})"
  value
