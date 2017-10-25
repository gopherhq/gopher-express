const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config.js');
const gopherUtils = require('../lib/gopherUtils');
const _ = require('lodash');


// Validates your webhook and populates the Gopher API client
router.use(gopherUtils.validateWebhook);


/*

  onCommand – Hit when an email command (ex: invite@my-cmd.gopher.email) has been received.
  Complete reference for JSON responses: https://developers.gopher.email/#json-reference

*/

router.post('/onCommand', function(request, response) {
  console.log('onCommand hit');
  response.send(
    {
      "something_incorrect": "here",
      "version": 1, // required (specifies which version of Gopher JSON parser to use)
      "task": {
        "reminder_time": 123456890,   // unix timestamp of reminder due date
        "reminder_timeformat": "1sec", // natural language reminder date (can be recurring)
        "reference_email": { // a changable version of the original email command
          "command_format": "me.1day@remind.gopher.email", 
          "method": "", // to|cc|bcc|fwd
          "to": [],
          "cc": [],
          "bcc": [],
          "from": "",
          "subject": "",
          "html": "",
        },
        "private_data": {
        "contact_id": "12345" // store information accessible to only this task (will be sent on every future webhook for this task)
        }
      },
      "extension": {
        "private_data": {
          "api_key": "20939uaua93a30" // store information accessible to all tasks with this extension (will be sent on every future webhook for for all tasks with this extension)
          }
      },
      "responses": [ // send outbound messages (only emails for now)
        {
          "type": "email",
          "to": "email@email.com",
          "cc": "email@email.com, email1@email.com",
          "bcc": "email@email.com, email1@email.com",
          "from": "Sender Name",
          "subject": "Some custom subject",
          "reply-to": {"action":"arbitrary.data.string"}, // this reply is an email-action, allowing for a dialog with your application, it can also be just an email address
          "soft-error": "Please connect Evernote to make this extension work", //You can also use this tell a user to set up a plugin if one has not yet been set up yet. 
          "body": [
            { 
              "type": "title",
              "text": "My Great Extension"
            },
            {
              "type": "section",
              "title": "DESCRIPTION",
              "text": "This is some text under the description title."
            },
            {
              "type": "html",
              "text": "Include images, HTML or other items here"
            },
            {
              "type": "button",
              "text": "Press Me",
              "url": "https://www.github.com"
            },
            {
              type: "button",  //see section on email-based actions
              text: "Action Email: Turn off confirmations",
              action: 'notifications.off',
              subject: "Hit Send to Turn off Confirmation Emails",
              body: "This is a Gopher email-action, a handy way of getting stuff done without ever leaving your inbox.",
            },
            { // (Temporarily used snippet to force elements in their own section)
              type: 'html',
              text: '<table width="100%" border="0"><tr><td></td></tr></table>',
            }

          ]
        } // One webhook response can contain many outbound emails.
      ]
    }
  ); 
});


/*

  onTrigger – Hit when a command is triggered (ex: a reminder is due).
  
*/


router.post('/onTrigger', function(request, response) {
  response.send({test: "true"})
  
});

module.exports = router;
