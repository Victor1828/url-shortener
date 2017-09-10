var express = require('express');
var shortUrl = require('../public/javascripts/url');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/new/:url(*)', function(req, res, next) {
  var url = req.params.url;

  // regex for url
  var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  if(regex.test(url)){
    var id = Math.floor(Math.random()*10000).toString();
    //check for url http if not, add http
    var http = new RegExp('^(http|https)://', 'i');
    if(http.test(url)){
      var data = new shortUrl({
        original_url: url, 
        short_url: "https://vegashort-url.herokuapp.com/" + id
      });
    }else{
      var data = new shortUrl({
        original_url: "http://" + url, 
        short_url: "https://vegashort-url.herokuapp.com/" + id
      });
    }
    data.save(function(err){
      if(err){
        res.render('error');
      }
    });
    res.json(data);
  }else{
    res.json({error: 'Invalid URL or wrong URL format'});
  }
});

// query database and redirect to original url
router.get('/:redirect', function(req, res, next){
  var url = req.params.redirect;

  shortUrl.findOne({short_url: "https://vegashort-url.herokuapp.com/" + url}, function(err, data){
    if(err){
      res.render('error');
    }
    res.redirect(301, data.original_url);
  });
});

module.exports = router;
