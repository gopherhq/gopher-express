const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');
const util = require('util');
const debug  = util.debuglog('fut');
var gopherClient = '';

router.post('/test', (req, res) => res.send('ok'));

//populate gopherClient
router.use(function(req, res, next) {
  gopherClient = req.app.get('gopherClient');
  next();
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


module.exports = router;
