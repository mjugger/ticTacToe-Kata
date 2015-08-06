var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Unbeatable Tic Tac Toe Kata' });
});

module.exports = router;
