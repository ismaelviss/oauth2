const express = require('express');
const bodyParse = require("body-parser");
const jwt = require("jsonwebtoken");
const { config } = require("./config");
const { json } = require('body-parser');
const cors = require("cors");
const request = require('request');
const encodeBasic = require("./utils/encodeBasic");

const app = express();

const corsOptions = { origin: "http://example.com" };

app.use(cors(corsOptions));

//body parser
app.use(bodyParse.json());

function getTwitters(accessToken, userId) {
    if (!accessToken || !userId) {
      return Promise.resolve(null);
    }
  
    const options = {
      url: `https://api.twitter.com/2/users/${userId}/tweets`,
      headers: { Authorization: `Bearer ${accessToken}` },
      json: true
    };
  
    return new Promise((resolve, reject) => {
      request.get(options, function(error, response, body) {
        if (error || response.statusCode !== 200) {
          reject(error);
        }
        resolve(body);
        
      });
    });
  }

  function getUserId(accessToken, userName) {
    if (!accessToken || !userName) {
      return Promise.resolve(null);
    }
  
    const options = {
      url: `https://api.twitter.com/2/users/by/username/${userName}`,
      headers: { Authorization: `Bearer ${accessToken}` },
      json: true
    };
  
    return new Promise((resolve, reject) => {
      request.get(options, function(error, response, body) {
        if (error || response.statusCode !== 200) {
          reject(error);
        }
        resolve(body);
        
      });
    });
  }

app.get("/api/twittersUserId", async function(req, res, next) {
    const { userId } = req.query;

    const authOptions = {
        url: 'https://api.twitter.com/oauth2/token',
        headers: {
            Authorization: `Basic ${encodeBasic(config.twitterApiKey, config.twitterApiSecret)}`
        },
        form: {
            grant_type: "client_credentials"
        },
        json: true
    }

    request.post(authOptions, async function(error, response, body){
        if(error || response.statusCode !== 200) {
            next(error);
        }

        const accessToken = body.access_token;
        const twitters = await getTwitters(accessToken, userId);
        res.json({ twitters: twitters });
    });
});

app.get("/api/twittersUserName", async function(req, res, next) {
    const { userName } = req.query; 

    const authOptions = {
        url: 'https://api.twitter.com/oauth2/token',
        headers: {
            Authorization: `Basic ${encodeBasic(config.twitterApiKey, config.twitterApiSecret)}`
        },
        form: {
            grant_type: "client_credentials"
        },
        json: true
    }

    request.post(authOptions, async function(error, response, body){
        if(error || response.statusCode !== 200) {
            next(error);
        }

        const accessToken = body.access_token;
        console.log(userName);
        const userId = await getUserId(accessToken, userName);
        console.log(userId);
        
        const twitters = await getTwitters(accessToken, userId.data.id);
        res.json({ twitters: twitters });
    });
});

const server = app.listen(5002, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});