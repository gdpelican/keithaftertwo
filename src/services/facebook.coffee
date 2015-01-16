console.log 'Initializing facebook client...'

https  = require 'https'
config = require('../config/config').facebook
path   = "#{config.host}#{config.path}?limit=#{config.limit}&access_token=#{config.access_token}"

exports.read = (options = {}, success, failure) ->
  buffer = ''
  request = https.get path, (response) ->
    response.setEncoding 'utf8'
    response.on 'data', (chunk) ->
      buffer += chunk
    response.on 'end', ->
      data = json buffer
      if      data.data?  then success(data.data)
      else if data.error? then failure(data.error)
      else                     failure('An unknown error occurred')
  .on('error', (e) -> failure(e))
  .end()

json = (str) ->
  eval "var value = (#{str})"
  value
