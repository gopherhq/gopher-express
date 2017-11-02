const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const config = require('../config.js');
const gopherUtils = require('../lib/gopherUtils');
const _ = require('lodash');


// Validates your webhook and populates the Gopher API client (ex: "onCommand, onAction, etc")
router.use(/on*/, gopherUtils.validateWebhook);

/*

  onCommand – Hit when an email command (ex: invite@my-cmd.gopher.email) has been received.
  Complete reference for JSON responses: https://developers.gopher.email/#json-reference

*/

router.post('/onCommand', function(request, response) {
  console.log('onCommand hit');
  response.json(
    {
      "version": 1,
      "response": [
        {
          "type": "email",
          "to": "esweetland@gmail.com",
          "from": "Sender Name",
          "subject": "A Custom Email Subject From Gopher",
          "reply-to": {"action":"arbitrary.data.string"}, // this reply is an email-action, allowing for a dialog with your application, it can also be just an email address
          "soft-error": "This is just a test", //You can also use this tell a user to set up a plugin if one has not yet been set up yet. 
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
              "text": `Include images, HTML or other items here. 
                        <p> Deflector power at maximum. Energy discharge in six seconds. Warp reactor core primary coolant failure. Fluctuate phaser resonance frequencies. Resistance is futile. Recommend we adjust shield harmonics to the upper EM band when proceeding. These appear to be some kind of power-wave-guide conduits which allow them to work collectively as they perform ship functions. Increase deflector modulation to upper frequency band.</p>
                        <p>I have reset the sensors to scan for frequencies outside the usual range. By emitting harmonic vibrations to shatter the lattices. We will monitor and adjust the frequency of the resonators. He has this ability of instantly interpreting and extrapolating any verbal communication he hears. It may be due to the envelope over the structure, causing hydrogen-carbon helix patterns throughout. I'm comparing the molecular integrity of that bubble against our phasers.</p>
                        <p>Sensors indicate no shuttle or other ships in this sector. According to coordinates, we have travelled 7,000 light years and are located near the system J-25. Tractor beam released, sir. Force field maintaining our hull integrity. Damage report? Sections 27, 28 and 29 on decks four, five and six destroyed. Without our shields, at this range it is probable a photon detonation could destroy the Enterprise.</p>
                      `
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
              body: "name: %0A amount: %0A tag [network, colo, hosting]: %0A probability[1-10]: %0A%0A%0A--%0AThis is a Gopher email-action, a handy way of getting stuff done without ever leaving your inbox.",
            },
            { // (Temporarily used snippet to force elements in their own section)
              type: 'html',
              text: '<table width="100%" border="0"><tr><td></td></tr></table>',
            }

          ]
        }
      ]
    }); 
});


/*

  onTrigger – Hit when a command is triggered (ex: a reminder is due).
  
*/


router.post('/onTrigger', function(request, response) {
  response.send({
    version: "1",
    extension: {
      "private_data": {
        "triggered": "23"
      }
    }
  })
  
});

router.post('/', function(reqest, response) {
  console.log(reqest);
  response.send({ok: true});
})

module.exports = router;
