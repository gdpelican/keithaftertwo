express  = require 'express'
router   = express.Router()
tumblr   = require '../services/tumblr'
facebook = require '../services/facebook'
db       = require '../db/db'

router.get '/', (req, res) ->
  facebook.read {}, (facebookPosts) ->
    tumblr.postAll facebookPosts, (post, error) ->
      if post? && post.id?
        new db.Post({id: post.id}).save
      else
        console.log error

    res.render 'index', { title: 'Did it!' }

module.exports = router
