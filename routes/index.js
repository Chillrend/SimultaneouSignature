var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: process.env.EVENT_NAME });
});

router.get('/signs', function(req, res, next) {
  res.render('add_signs', { title: process.env.EVENT_NAME, scripts: [{script: "/javascripts/jsketch.min.js"}] });
});

module.exports = router;
