const express = require('express');
const bodyParse = require("body-parser");
const jwt = require("jsonwebtoken");
const { config } = require("./config");

const app = express();


//body parser
app.use(bodyParse.json());

app.post("/api/auth/token", function(req, res){
    const { email, username, name } = req.body;
    const token = jwt.sign({sub: username, email, name}, config.authJwtSecret);
    res.json({access_token: token });
});

const server = app.listen(5001, function() {
    console.log(`Listening http://localhost:${server.address().port}`);
});