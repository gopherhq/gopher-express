const express = require("express");
const router = express.Router();
const config = require("../lib/config.js");
const _ = require("lodash");
const gopherUtils = require("../lib/gopherUtils");

// Validates your webhook and populates the Gopher API client
router.use(gopherUtils.rawBody);
router.use(gopherUtils.validateWebhook);

router.post("/", function(request, response) {
  console.log("Webhook received!");
  const webhook = request.body;
  switch (webhook.event) {
    case "task.created":
      // All available JSON responses to the Gopher API
      let exampleWebhookResponse = {
        version: 1,

        // Update the Gopher Task that was just created
        task: {
          // Set when the 'event.trigger' webhook will fire (timestamp)
          // trigger_time: 2512090247758,

          // Same as above, but FollowUpThen style, and can be recurring
          // trigger_timeformat: "3days",

          // A mutable version of the original, used as reference data for other events
          reference_email: {
            to: [],
            cc: [],
            bcc: [],
            from: "",
            subject: "",
            html: "<p>This is a pragraph in an email</p>"
          },

          // Store data for only this task. Send with subsequent webhooks
          private_data: {
            example: "12345"
          }
        },

        // Send out emails. In practice, these values can be set from webhook request.
        send_messages: [
          {
            type: "email",
            to: "name@example.com",
            cc: "",
            bcc: "",
            from: "Sender Name",
            subject: "A Custom Email Subject From Gopher",
            // Reply to an email-action, allowing for programatic dialog, or an emai address.
            reply_to: { action: "arbitrary.data.string" },
            //reply_to: "email@email.com,
            body: [
              {
                type: "soft-error",
                text: "This error message is highlighted at the top"
              },
              {
                type: "title",
                text: "A Great Title"
              },
              {
                type: "section",
                title: "DESCRIPTION"
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
                action: "notifications.off", // An email-based action
                subject: "Hit Send to Turn off Confirmation Emails",
                body:
                  "This is a Gopher email-action, a handy way of getting stuff done without ever leaving your inbox.",
                style: "block primary"
              },
              {
                type: "button",
                text: "Action Email: Turn off confirmations",
                action: "notifications.off",
                style: "block",
                subject: "Hit Send to Turn off Confirmation Emails",
                body:
                  "This is a Gopher email-action, a handy way of getting stuff done without ever leaving your inbox."
              },
              {
                type: "section"
              }
            ]
          }
        ]
      };

      response.send(exampleWebhookResponse);
      break;

    case "task.triggered":
      console.log("task.triggered");
      // Handle the moment the task becomes due. Ex: Refresh information, send a followup email
      break;

    case "task.updated":
      console.log("task.updated");
      // Handle when a task is updated. Ex: Keep the due-date of your CRM in sync
      break;

    case "task.action_received":
      console.log("task.action_received");
      // Handle email-based actions. Ex: Adding notes, rescheduling, cancelling
      break;

    case "extension.triggered":
      console.log("extension.triggered");
      // Handle when an extension is triggered. Ex: Create a task when an event occurs
      break;

    case "extension.installed":
      console.log("extension.installed");
      // Handle an extension being first installed. Ex: Welcome the user
      break;

    case "extension.uninstalled":
      console.log("extension.uninstalled");
      // Handle when a user removes an extension. Ex: Delete associated API keys
      break;
  }
});

module.exports = router;
