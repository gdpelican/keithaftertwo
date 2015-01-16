express  = require 'express'
router   = express.Router();
facebook = require '../services/facebook'
tumblr   = require '../services/tumblr'
db       = require '../db/db'

router.get '/', (req, res) ->
  facebook.read req.params(), (facebookPosts) ->
    tumblr.postAll facebookPosts, (post, error) ->
      if post? && post.id?
        new db.Post({id: post.id}).save
      else
        console.log error

      res.render 'index', { title: 'Did it!' }

module.exports = router
