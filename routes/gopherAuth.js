const express = require('express');
const router = express.Router();
let gopherClient = '';

// Auth – Send them to FUT to Authorize
router.get('/login', (req, res) => {
  gopherClient = req.app.get('gopherClient');
  let authUri = gopherClient.getAuthorizationUri().uri;
  let state = gopherClient.getAuthorizationUri().state;
  res
    .cookie('state', state) //verify this in callback to prevent CSRF
    .redirect(authUri);
});

// Auth - Hanndle OAuth callback + get access token
router.get('/callback', (req, res) => {
  if(req.query.state !== req.cookies.state) {
    return res.send({error: "ERROR: State token mismatch"});  // prevent CSRF
  }
  gopherClient.getAccessToken(req.query.code, (error, token) => {
    if(error) {
      return res.send({error: error});
    }
    return res
            .cookie('gopherToken', token)
            .send({message: "Successfully connected and token saved", "access_token": token});
  });
});

module.exports = router;
