express  = require 'express'
router   = express.Router();
facebook = require '../services/facebook'
tumblr   = require '../services/tumblr'

router.get '/', (req, res) ->
  res.render 'index', { title: 'Express' }

module.exports = router
