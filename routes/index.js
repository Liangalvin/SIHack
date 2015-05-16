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

  // console.log(client);
  client.stream('statuses/filter', {track: '#nygiants'}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet);
  });

  stream.on('error', function(error) {
    throw error;
  });
});

  res.render('../views/index.ejs', { msg: 'Express'});
});

module.exports = router;
