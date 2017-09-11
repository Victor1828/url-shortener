var express = require('express');
var shortUrl = require('../public/javascripts/url');
var router = express.Router();

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