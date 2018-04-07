/**
   Handle auth. This should not require customization.
 */

const debug = require("debug")("gopher-express");
const express = require("express");
const router = express.Router();
const OAuth2 = require("simple-oauth2");
const config = require("../lib/config");
const Gopher = require("gopherhq");
const gopherClient = new Gopher(config);

// Redirect to login URL
router.get("/login", (req, res) => {
  const { uri, state } = gopherClient.getAuthorizationUri();
  res.cookie("gopherState", state).redirect(uri);
});

// After user authenticates, parse the auth code and get the actual auth token
router.get("/callback", async (req, res) => {
  const code = req.query.code;
  const stateCookie = req.cookies.gopherState;
  const state = req.query.state;
  if (stateCookie !== state) {
    return res.send(
      "Error: You may have been redirected to a different place from where you started, or your cookies are not being saved. (State mis-match)"
    );
  }

  try {
    let tokenDetails = await gopherClient.getAccessToken(code);
    if (tokenDetails instanceof Error) throw tokenDetails;
    return res
      .cookie("gopherToken", tokenDetails.token.access_token)
      .redirect("/?welcome=1");
  } catch (e) {
    console.log(e);
    return res.send(
      400,
      "There was an error fetching your authentication token (view logs for details)"
    );
  }
});

module.exports = router;
