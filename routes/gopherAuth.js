const express = require('express');
const router = express.Router();
const OAuth2 = require('simple-oauth2');
const config = require('../config');
let gopherClient = '';

const oauth2 = OAuth2.create({
  client: {
    id: config.clientId,
    secret: config.clientSecret
  },
  auth: {
    tokenHost: config.tokenHost,
    tokenPath: config.tokenPath,
    authorizePath: config.authorizePath,
  },
});

const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: config.redirectUri,
  scope: config.scope,
  state: config.state,
});

router.get('/login', (req, res) => {
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
router.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code: code,
    redirect_uri: config.redirectUri,
    client_id: config.clientId,
  };

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }
    
    const tokenDetails = oauth2.accessToken.create(result);
    console.log('Access token is: ', tokenDetails.token.access_token);
    return res
            .cookie('gopherToken', tokenDetails.token.access_token)
            .redirect('/?welcome=1');
  });
});

module.exports = router;
