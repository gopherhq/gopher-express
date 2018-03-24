const express = require("express");
const router = express.Router();
const _ = require("lodash");
const gopherUtils = require("../lib/gopherUtils");
let webhookResponse = null;
router.use(gopherUtils.rawBody);
router.use(gopherUtils.validateWebhook);

router.post("/", function(request, response) {
  // console.log("Instead of logging this...", request.body); // ...try using the Sandbox. It's faster and more fun 🏎
  const webhook = request.body;

  // Gopher posts different events to the same URL. Webhook reference: https://docs.gopher.email/v1.0/reference#webhooks
  switch (webhook.event) {
    /**
     *
     * TASK CREATED
     * Handle when a new task is created. Ex: Send a confirmation email,
     * schedule a followup, etc.
     * Task reference: https://docs.gopher.email/v1.0/reference#tasks-2
     *
     */
    case "task.created":
      webhookResponse = {
        version: 1,
        task: {
          // The task.triggered event will now fire in 15 minutes (see below)
          trigger_timeformat: "15min"
        },

        // Send a confirmation email.
        send_messages: [
          {
            type: "email",

            // Insert your email 👇 to preview, or just use the Sandbox.
            to: "recipient-email@example.com",
            from: "Gopher Express",
            subject: "Task will trigger in 15 minutes",
            body: [
              {
                type: "title",
                text: "Task will trigger in 15 minutes"
              },
              {
                type: "section",
                text: "WHAT HAPPENS NEXT?"
              },
              {
                type: "html",
                text: `
                <p>When this task triggers, Gopher will fire the 
                <strong>task.triggered</strong> webhook. You can either wait 15 minutes 
                for this to happen (boring), or use the Sandbox to trigger it right away 
                (awesome!). Open the log message for this task, then click the 
                lightning bolt ⚡️.</p>
                `
              },
              {
                type: "section",
                text: "CUSTOMIZE"
              },
              {
                type: "html",
                text: `Add custom HTML, buttons, sections or titles. See
                <a 
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://docs.gopher.email/v1.0/reference#email-ui-components"
                >
                Gopher UI Components
                </a> 
                for more information.`
              },
              {
                type: "section"
              }
            ]
          }
        ]
      };
      response.send(webhookResponse);
      break;

    /**
     *
     *  TASK TRIGGERED
     *  Handle when a task is triggered. Ex: when a reminder becomes due. You can manually
     *  trigger tasks in the Sandbox. More about event triggering: TODO: Insert URL
     *
     */
    case "task.triggered":
      webhookResponse = {
        version: 1,

        // Send an email reminder
        send_messages: [
          {
            type: "email",

            // Insert your email 👇 to preview, or just use the Sandbox.
            to: "name@example.com",
            from: "Gopher Express",

            // Tip: render the original subject with: webhook.task.reference_email.subject
            subject: "Here is your reminder",
            body: [
              {
                type: "title",
                text: "15 Minutes Later"
              },
              {
                type: "html",
                text: `
                  <p>This exceedingly productive gopher shows up in your inbox, reminding you 
                  <a 
                    href="https://trello.com/b/AhYnpKqa/gopher-extension-ideas
                    target="_blank"
                    rel="noopener noreferrer"
                  ">
                  how many things</a>
                  you can do with email alone. </p>
                `
              },
              {
                type: "html",
                text: `<img src="https://media.giphy.com/media/kKdgdeuO2M08M/giphy.gif" borer="0" width="300">`
              },
              {
                type: "section",
                text: "Actions"
              },
              {
                type: "html",
                text: `
                <p>Reschedule it 15 minutes later using 
                <a 
                  href="https://docs.gopher.email/v1.0/reference#email-based-actions"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  email-based actions
                </a>
                </p>
                `
              },
              {
                type: "button",
                text: "Postpone 15min",

                // An email-based action https://docs.gopher.email/v1.0/reference#email-based-actions (see below)
                action:
                  "reschedule.for.15min.every.weds.2pm.and.some.other.text.goes.here.test",
                subject: "Reschedule for 15 minutes",
                body:
                  "When you hit send, your extension will receive the task.action_received webhook.",
                style: "block primary"
              },
              {
                type: "section"
              }
            ]
          }
        ]
      };
      response.send(webhookResponse);
      break;

    /**
     *
     *  ACTION EMAIL RECEIVED
     *  Handle when an action email is received.
     *  Email-Based Actions ref: https://docs.gopher.email/v1.0/reference#email-based-actions
     *
     */
    case "task.action_received":
      webhookResponse = {
        version: 1,
        task: {
          // You can also populate this dynamically from the action email with webhook.action.action.split('.')[1]
          trigger_timeformat: "15min"
        }
      };
      response.send(webhookResponse);
      break;

    default:
      response.send({});
      break;
  }
});

module.exports = router;
