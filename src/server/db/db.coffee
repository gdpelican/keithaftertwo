db = require 'mongoose'

db.connection.on 'error', console.error
db.connection.once 'open', =>
  postSchema = new mongoose.Schema
    id: Number
    created_at: Date
    updated_at: Date
  exports.Posts = mongoose.model 'Post', postSchema

db.connect 'mongodb://localhost/keithaftertwo'
