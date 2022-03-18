require('dotenv').config();

const config = {
    twitterApiKey: process.env.TWITTER_API_KEY,
    twitterApiSecret: process.env.TWITTER_API_SECRET
}; 

module.exports = { config: config };
