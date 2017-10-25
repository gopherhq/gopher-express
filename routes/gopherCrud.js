const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');
const util = require('util');
const debug  = util.debuglog('fut');
var gopherClient = '';

//populate gopherClient from globals
router.use(function(req, res, next) {
  gopherClient = req.app.get('gopherClient');
  next();
});

// https://github.com/rsweetland/followupthen/wiki/FUT-APIs#get-a-list-of-reminders
router.get('/get-reminders', (req, res) => {
  gopherClient.getFuts({}, (error, response) => {
    console.log(error || response);
    res.send(error || response);
  });
});


// https://github.com/rsweetland/followupthen/wiki/FUT-APIs#get-a-single-reminder
router.get('/get-reminder', (req, res) => {
  gopherClient.getFut(917, (error, response) => {
    console.log(error || response);
    res.send(error || response);
  });
});


router.get('/save-settings', (req, res) => {
  gopherClient.saveExtData({foo: 'bar'}, (error, response) => {
    console.log(error || response);
    res.send (error || response);
  });
});

router.get('/get-settings', (req, res) => {
  gopherClient.getExtData((error, response) => {
    console.log(error || response);
    res.send (error || response);
  });
});




//see fut-node / tests director for examples of how to use the API

module.exports = router;
