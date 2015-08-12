var express = require('express');
var ai = require('../lib/my_node_modules/t3-ai');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  var aiRes = ai.t3AI.callAI(req.body.params);
  res.send(aiRes);
});

module.exports = router;