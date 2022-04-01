const config = {
    spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
    spotifyRedirectUri: process.env.SPOTIFY_REDIRECT_URI,
    auth0Domain: process.env.AUTH0_DOMAIN,
    auth0ClienteId: process.env.AUTH0_CLIENTE_ID,
    auth0ApiAudience: process.env.AUTH0_API_AUDIENCE,
    authRedirectUri: process.env.AUTH_REDIRECT_URI
};

module.exports = { config }; 