const express = require('express');
const bodyParse = require("body-parser");
const jwt = require("jsonwebtoken");
const { config } = require("./config");
const { json } = require('body-parser');

const app = express();


//body parser
app.use(bodyParse.json());

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

const server = app.listen(5001, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});