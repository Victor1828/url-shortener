var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/new/:url(*)', function(req, res, next) {
  var url = req.params.url;
  var data = {original_url: url}
  res.json(data);
});

module.exports = router;
