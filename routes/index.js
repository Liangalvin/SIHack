var express = require('express')
,   router = express.Router()
,   fs = require('fs')
,   Twitter = require('twitter')
,   client;

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
  res.render('../views/index.ejs', { msg: 'Express'});
});

router.post('/find', function(req, res){
    // query database for team city and team name ex: New York Giants = #NYGiants
    // render map here
    var teamName = req.body.teamName
    ,   city = req.body.cityName
    ,   tweetMsg;

    client.get('search/tweets', {q: '#'+city+teamName}, function(error, tweets, response){
      var message = tweets.statuses[14].text;
      tweetMsg = {
        msg: message
      }
      res.render('../views/team.ejs', {msg: tweetMsg});
    });
});

module.exports = router;
