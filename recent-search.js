const https = require('https');
const request = require('request');
const util = require('util');

const get = util.promisify(request.get);
const post = util.promisify(request.post);

const consumer_key = 'B9n6MyQXb5rsAgzymShRs3VHF'; // Add your API key here
const consumer_secret = 'SVaoYWIkD5qGnbollOZLBXcD8klkJU0sIdWO4k2J7cSfK70uhc'; // Add your API secret key here

const bearerTokenURL = new URL('https://api.twitter.com/oauth2/token');
const tweetFields = "created_at,author_id,lang,text";
const query = "%23blacklivesmatter%20motherhood%20-is:retweet"
const maxResults = '100'


const searchURL = new URL('https://api.twitter.com/labs/2/tweets/search?tweet.fields='+tweetFields+'&query='+query+'&max_results='+maxResults);

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

  const requestConfig = {
    url: searchURL,
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
    console.log("THE STATUS CODE");
    console.log(res.statusCode);
    console.log("THE RESPONSE");
    console.log(res);
    if (res.statusCode !== 200) {
      throw new Error(res.json);
      return;
    }
    console.log("THE JSON");
    console.log(res.body);

    var key, count = 0;
    for (var i=0; i<res.body.data.length; i++) {
      console.log("Tweet #"+i+" : "+res.body.data[i].text);
    }
    console.log("We got " + res.body.data.length + " results");
  } catch (e) {
    console.error(`Could not get search results. An error occurred: ${e}`);
    process.exit(-1);
  }
})();
