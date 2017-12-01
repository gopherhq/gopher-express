const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config.js');
const gopherUtils = require('../lib/gopherUtils');
const _ = require('lodash');


// Validates your webhook and populates the Gopher API client (ex: "onCommand, onAction, etc")
router.use('on*', gopherUtils.validateWebhook);

// onCommand – Fires when an email command (ex: invite@my-cmd.gopher.email) has been received.
router.post('/onCommand', function(request, response) {
  
  // This is a complete reference of all available JSON fields
  let completeJsonResponse = {
      "version": 1, 
      task: {
        reminder_time: 2512090247758, // unix timestamp of when trigger event will be fired for this task
        reminder_timeformat: "3weeks", // natural language reminder date (can be recurring) for triggering
        reference_email: { // a mutable version of the original email
          to: [],
          cc: [],
          bcc: [],
          from: "",
          subject: "Subject", // You can set these to static values, or passed in the webhook.
          html: "",
        },
        "private_data": { // store key/value data accessible to only this task (sent on every future webhook for this task)
          "contact_id": "12345" // a random key/value pair..this could be anything
        }
      },
      "response": [
        { // This is a static email response. Add your email to the 'to' field if you'd like. 
          // In practice, these values would be dynamically pulled from the webhook post.
          type: "email",
          to: "",
          cc: "",
          bcc: "",
          from: "Sender Name",
          subject: "A Custom Email Subject From Gopher",
          reply_to: {"action":"arbitrary.data.string"}, // this reply is an email-action, allowing for a dialog with your application, it can also be just an email address
          //reply_to: "email@email.com,   // reply_to can also just be an email address
          body: [
            {
              type: "soft-error",
              text: "Give the user an error here" // For example, if a user has to login to set up a plugin
              
            },
            {
              type: "title",
              ext: "A Great Title"
            },
            {
              type: "section",
              title: "DESCRIPTION",
            },
            {
              type: "html",
              text: `Include images, HTML or other items here. 
                        <p> Deflector power at maximum. Energy discharge in six seconds. Warp reactor core primary coolant failure. Fluctuate phaser resonance frequencies. Resistance is futile. Recommend we adjust shield harmonics to the upper EM band when proceeding. These appear to be some kind of power-wave-guide conduits which allow them to work collectively as they perform ship functions. Increase deflector modulation to upper frequency band.</p>
                        <p>I have reset the sensors to scan for frequencies outside the usual range. By emitting harmonic vibrations to shatter the lattices. We will monitor and adjust the frequency of the resonators. He has this ability of instantly interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout. I'm comparing the molecular integrity of that bubble against our phasers.</p>
                        <p>Sensors indicate no shuttle or other ships in this sector. According to coordinates, we have travelled 7,000 light years and are located near the system J-25. Tractor beam released, sir. Force field maintaining our hull integrity. Damage report? Sections 27, 28 and 29 on decks four, five and six destroyed. Without our shields, at this range it is probable a photon detonation could destroy the Enterprise.</p>`
            },
            {
              type: "section",
              title: "button styles"
            },
            {
              type: "button",
              text: "Primary",
              style: "primary",
              url: "https://www.github.com"
            },
            {
              type: "button",
              text: "Secondary)",
              url: "https://www.github.com"
            },
            {
              type: "button",
              text: "Press Me",
              url: "https://www.github.com"
            },
            {
              type: "section",
              title: "block buttons"
            },
            {
              type: "button", 
              text: "Action Email",
              action: 'notifications.off',  //see section on email-based actions
              subject: "Hit Send to Turn off Confirmation Emails",
              body: "name: %0A amount: %0A tag [network, colo, hosting]: %0A probability[1-10]: %0A%0A%0A--%0AThis is a Gopher email-action, a handy way of getting stuff done without ever leaving your inbox.",
              style: "block primary"          
            },
            {
              type: "button", //see section on email-based actions
              text: "Action Email: Turn off confirmations",
              action: 'notifications.off',
              style: "block",
              subject: "Hit Send to Turn off Confirmation Emails",
              body: "This is a Gopher email-action, a handy way of getting stuff done without ever leaving your inbox."
            },
            { // (Temporarily used snippet to force elements in their own section)
              type: 'html',
              text: '<table width="100%" border="0"><tr><td></td></tr></table>',
            }

          ]
        }
      ]
  };
      
  response.send(completeJsonResponse);
});


// onTrigger – Hit when a command is triggered (ex: a reminder is due).
router.post('/onTrigger', function(request, response) {
  response.send({
    version: "1",
    extension: {
      "private_data": {
        "triggered": "23"
      }
    },
    response: [
      {
        type: "email",
        
      }
    ]
  })
  
});

module.exports = router;