require('dotenv').config();

const config = {
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    authJwksSecret: process.env.AUTH_JWKS_PRIVATE_SECRET
}; 

module.exports = { config: config };
