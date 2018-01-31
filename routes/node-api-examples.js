// Examples of how to interact with the Gopher API via
// Node / Express. The Gopher API lib (https://www.npmjs.com/package/gopherhq)
// works in both node and the browser. See the public folder for
// browser examples.

const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("../lib/config");
let gopherClient = "";

// Get the API client for all subsequent requests
router.use(function(req, res, next) {
  gopherClient = req.app.get("gopherClient");
  next();
});

//callback style
router.get("/test", (req, res) => {
  gopherClient.saveExtensionSettings({ foo: "bar" }, (error, response) => {
    res.send(error || response);
  });
});

// Async / await, if you are on Node 7.6+)
router.get("/await", async (req, res) => {
  try {
    let saved = gopherClient.saveExtensionSettings({ foo: "bar" });
    res.send(saved);
  } catch (e) {
    res.send(400, e);
  }
});

module.exports = router;
