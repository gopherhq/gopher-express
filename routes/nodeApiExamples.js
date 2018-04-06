/**

      ____             _               
      / ___| ___  _ __ | |__   ___ _ __ 
    | |  _ / _ \| '_ \| '_ \ / _ | '__|
    | |_| | (_) | |_) | | | |  __| |   
      \____|\___/| .__/|_| |_|\___|_|   
                |_|                    

    Need help? Get in touch!
    slack: slackin.gopheremail.com
    email: help+gopher@humans.fut.io


 * ABOUT THIS FILE:
 * Examples of interacting with the Gopher API
 * in this file: https://github.com/gopherhq/gopherhq-js
 *
 **/

const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../lib/config");
let gopherClient = "";

// Get the authenticated API client, set up in ../lib/gopherUtils.js requireLogin()
router.use(function(req, res, next) {
  gopherClient = req.app.get("gopherClient");
  next();
});

// Callback style
router.get("/saveSettings", (req, res) => {
  gopherClient.saveExtensionData({ foo: "bar" }, (error, response) => {
    res.send(error || response);
  });
});

// Async / await, if you are on Node 7.6+ (like Glitch ✓)
router.get("/saveSettingsAwait", async (req, res) => {
  try {
    let saved = await gopherClient.saveExtensionData({ foo: "bar" });
    if (saved instanceof Error) throw saved;
    res.send(saved);
  } catch (e) {
    res.send(400, e);
  }
});

module.exports = router;
