const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config.js');
const gopherUtils = require('../lib/gopherUtils');
const _ = require('lodash');

router.use(gopherUtils.validateWebhook);

router.post('/onCommand', (req, res) => {
  console.log('onCommand hit');
  res.send({
  "extension": {
    "private_data": {
      "evernote-id": "92939303"
    },
    "incorrect_thingy": {
      "footfdas": 'fdas'
    }
  },
  "version": 1,
  "response": [ // send emails and responses 
    {
      "type": "email",
      "to": "esweetland@gmail.com",
      "subject": "From Glitch",
      "body": [
        {
          "type": "title",
          "text": "My First Extension"
        },
        {
          "type": "html",
          "width": "100%",
          "text": "<strong>There are only a <em>few</em>tags we would support</strong>"
        }
      ]
    }]
  });   
});

module.exports = router;
