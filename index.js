// index.js
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set up your search parameters
var params = {
  q: '#blacklivesmatter motherhood',
  count: 100,
  result_type: 'recent',
  lang: 'en',
  filter:'retweets, replies'
}

T.get('search/tweets', params, function(err, data, response) {
  if(!err){
    console.log(data.statuses.length)
    // Loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      // Get the tweet Id from the returned data
      let id = { id: data.statuses[i].id_str }


      console.log(data.statuses[i].text)
    }
  } else {
    console.log(err);
  }
})
