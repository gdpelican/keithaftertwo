console.log 'Initializing local database...'

db = require 'mongoose'

db.connection.on 'error', console.error
db.connection.once 'open', =>
  postSchema = new db.Schema
    id: Number
    created_at: Date
    updated_at: Date
  exports.Post = db.model 'Post', postSchema

db.connect 'mongodb://localhost/keithaftertwo'
