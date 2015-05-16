var express = require('express');
var router = express.Router();
var fs = require('fs');
var Twitter = require('twitter');
var client;

fs.readFile('apikey.json', function(err, data){
var text = JSON.parse(data);
  if (err) {throw err;}

  client = new Twitter({
    consumer_key: text.apiKey,
    consumer_secret: text.apiSecret,
    access_token_key: text.token,
    access_token_secret: text.tokenSecret
  });

});

/* GET home page. */
router.get('/', function(req, res, next) {

  var msg;

  client.get('search/tweets', {q: '#NYGiants'}, function(error, tweets, response){
      console.log(tweets.statuses);
  });


  res.render('../views/index.ejs', { msg: 'Express'});
});

module.exports = router;
