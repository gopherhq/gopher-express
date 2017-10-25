const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config.js');

var gopherClient = '';
//populate gopherClient from globals
router.use(function(req, res, next) {
  gopherClient = req.app.get('gopherClient');
  next();
});

// https://stackoverflow.com/questions/18710225/node-js-get-raw-request-body-using-express#answer-26634372
router.use(bodyParser.json({
  verify: function(req, res, buf, encoding) {
    req.rawBody = buf.toString();
  }
}));


// // validates the webhook from the raw event object posted from AWS / Serverless
// debug('validateWebhook Event: ', event);
// const webhookTimestamp = event.headers['X-FUT-Timestamp'] || event.headers['X-Fut-Timestamp']; //they come both ways
// const webhookSignature = event.headers['X-FUT-Signature'] || event.headers['X-Fut-Signature'];

// let rawBody = '';
// if (event.body)
//   rawBody = event.body.toString()

// // sls offline does not esape forward slashes
// if (process.env.IS_OFFLINE)
//   rawBody = rawBody.replace(new RegExp('\\/', 'g'), '\\/');

// debug('Webhook Info: ', webhookSignature, webhookTimestamp, rawBody, verifyAge);
// return gopherClient.validateWebhook(webhookSignature, webhookTimestamp, rawBody, verifyAge);


router.post('/onCommand', (req, res) => {
  console.log('onCommand hit', req);
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
