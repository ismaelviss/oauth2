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

function getUserPlaylists(accessToken, userId) {
    if (!accessToken || !userId) {
      return Promise.resolve(null);
    }
  
    const options = {
      url: `https://api.spotify.com/v1/users/${userId}/playlists`,
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

app.post("/api/auth/token", function(req, res){
    const { email, username, name } = req.body;
    const token = jwt.sign({sub: username, email, name}, config.authJwtSecret);
    res.json({access_token: token });
});

app.post("/api/auth/tokenjwks", function(req, res){
    const { email, username, name } = req.body;
    const token = jwt.sign({sub: username, email, name}, config.authJwksSecret, { algorithm: 'RS256'});
    res.json({access_token: token });
});

app.get("/api/auth/verify", function(req, res, next) {
    const { access_token } = req.query

    try {
        const decoded = jwt.verify(access_token, config.authJwtSecret)
        res.json({message: "the access token is valid", username: decoded.sub})
    } catch(err) {
        next(err);
    }
});

app.get("/api/playlists", async function(req, res, next) {
    const { userId } = req.query;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            Authorization: `Basic ${encodeBasic(config.spotifyClientId, config.spotifyClientSecret)}`
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
        const userPlayLists = await getUserPlaylists(accessToken, userId);
        res.json({ playlists: userPlayLists });
    });
});

const server = app.listen(5001, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});