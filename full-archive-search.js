const https = require('https');
const request = require('request');
const util = require('util');

const get = util.promisify(request.get);
const post = util.promisify(request.post);

const consumer_key = 'B9n6MyQXb5rsAgzymShRs3VHF'; // Add your API key here
const consumer_secret = 'SVaoYWIkD5qGnbollOZLBXcD8klkJU0sIdWO4k2J7cSfK70uhc'; // Add your API secret key here

const bearerTokenURL = new URL('https://api.twitter.com/oauth2/token');
const fromDate = '202011010000'
const toDate = '202012010000'


const searchURL = new URL('https://api.twitter.com/1.1/tweets/search/fullarchive/BLM.json?query=%23blacklivesmatter%20motherhood%20&maxResults=100&fromDate='+fromDate+'&toDate='+toDate);

async function bearerToken (auth) {
  const requestConfig = {
    url: bearerTokenURL,
    auth: {
      user: consumer_key,
      pass: consumer_secret,
    },
    form: {
      grant_type: 'client_credentials',
    },
  };

  const response = await post(requestConfig);
  return JSON.parse(response.body).access_token;
}

(async () => {
  let token;
  //const query = "#blacklivesmatter motherhood -is:retweet";
  //const tweetFields = "created_at,author_id,id,text";
  //const maxResults = 100;

  try {
    // Exchange your credentials for a Bearer token
    token = await bearerToken({consumer_key, consumer_secret});
  } catch (e) {
    console.error(`Could not generate a Bearer token. Please check that your credentials are correct and that the Filtered Stream preview is enabled in your Labs dashboard. (${e})`);
    process.exit(-1);
  }

  var myArgs = process.argv.slice(2);

  var twitterURL = "";

  if (myArgs.length == 0) {
    twitterURL = searchURL;
  } else {
    twitterURL = new URL('https://api.twitter.com/1.1/tweets/search/fullarchive/BLM.json?query=%23blacklivesmatter%20motherhood%20&maxResults=100&fromDate='+myArgs[0]+'&toDate='+myArgs[1]);
  }

  console.log("Making a call to "+twitterURL);

  const requestConfig = {
    url: twitterURL,
    auth: {
      bearer: token,
    },
    headers: {
      'User-Agent': 'LabsRecentSearchQuickStartJS',
    },
    json: true,
  };

  try {
    const res = await get(requestConfig);
    if (res.statusCode !== 200) {
      throw new Error(res.json);
      return;
    }

    console.log("And now the nice pretty data...")

    var key, count = 0;
    for (var i=0; i<res.body.results.length; i++) {
      console.log("Tweet #"+i+" : "+res.body.results[i].text);
    }
    console.log("We got " + res.body.results.length + " results");
  } catch (e) {
    console.error(`Could not get search results. An error occurred: ${e}`);
    process.exit(-1);
  }
})();
