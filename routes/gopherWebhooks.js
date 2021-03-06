/**
 * ABOUT THIS FILE:
 *
 * Gopher and your extenion mainly interact with Webhooks, as demonstrated
 * in this file.
 *
 * To illustrate:
 *
 * -> (event) -> Gopher API -> Webhook (JSON) -> Your Extension
 *                                                      |
 * <- (action) <- Gopher API <- Response (JSON) <- (Custom Logic)
 *
 * Examples of events: emails being received, tasks updated, extension installed
 * Examples of custom logic: add to a crm, create todo, make additional API calls to Gopher
 * Examples of actions: send an email, save data, reschedule a task
 *
 * More about webhooks: https://docs.gopher.email/v1.0/reference#webhooks
 *
 **/

const express = require("express");
const router = express.Router();
const _ = require("lodash");
const gopherUtils = require("../lib/_gopherUtils");
let webhookResponse = null;
const gopherSalesforce = require('./gopherSalesforce');
const gopherGithub = require('./gopherGithub');
const gopherProducthunt = require('./gopherProducthunt');

/**
 * Validates your webhook and authenticates the Gopher REST API Client, allowing you
 * to make additional API calls to Gopher while handling a webhook.
 * More about the API Client: https://github.com/gopherhq/gopherhq-js
 */
router.use(gopherUtils.rawBody);
router.use(gopherUtils.validateWebhook);

router.post("/", function(request, response) {
  /**
   *
   * ️TIP
   * Instead of useing console.log, use the Sandbox🏝! It lets you:
   * ✓ Inspect the JSON request and response
   * ✓ Collapse / expand nested JSON objects
   * ✓ View the rendered email
   * ✓ Validate your JSON schema
   * ✓ Trigger webhook events
   * ✓ Have fun and move fast 🏎
   *
   */
  const webhook = request.body;


  // View all webhooks webhook events: https://docs.gopher.email/v1.0/reference#webhooks
  switch(webhook.event) {
      

    case "task.created": 
    /**
     *
     * APPLICATION LOGIC GOES HERE
     * You just got an email command from a user which created a Gopher Task.
     * (A "task" like a "todo" item with special email-based features.
     * More about tasks: https://docs.gopher.email/v1.0/reference#tasks)
     * 
     * Now your extension can do something awesome:
     * File data in a CRM, make a calendar event, add a subscriber, etc.
     * The incoming webhook body has helpful information to get those
     * things done (use the Sandbox to reference the webhook's data).
     * The webhook response tells Gopher what to do next: Save task data,
     * send an email, etc.
     * Webhook response reference: https://docs.gopher.email/v1.0/reference#webhook-response
     * Email command reference: https://docs.gopher.email/v1.0/reference#email-commands
     *
     */

      
      // Ex salesforce@your-ext.gopher.email
      switch(webhook.command.params[0]) {
        case "salesforce":
          return response.send(gopherSalesforce.handleDemo(webhook));
        break;
        
        // Ex github@your-ext.gopher.email
        case "github":
          return response.send(gopherGithub.handleDemo(webhook));
        break;
        
        // producthunt@your-ext.gopher.email
        case "producthunt":
          return response.send(gopherProducthunt.handleDemo(webhook));
        break;
        
        // Set a simple email reminder by default Ex: [anything]@your-ext.gopher.email 
        default:
        
        const webhookResponse = {
          version: 1,
          task: {
            /**
             *  Schedule the task to trigger using a natural language syntax (Trigger handling below).
             *  Scheduling formats: https://docs.gopher.email/v1.0/reference#natural-language-dates
             *  Use the user preference instead: webhook.extension.private_data.reminder_interval
             */
            trigger_timeformat: "1min"
          },

          // Send an immediate confirmation email to the user
          send_messages: [
            {
              type: "email",
              to: webhook.source.from, // Sent to whoever sent the email
              from: "Gopher Express",
              subject: "Task will trigger in 15 minutes",
              body: [
                /**
                 *
                 * EMAIL UI COMPONENTS
                 * UI component reference: https://docs.gopher.email/v1.0/docs/email-ui-reference
                 * Jumpstart your extension is by copying one of the
                 * example layouts here: https://docs.gopher.email/v1.0/docs/complete-examples
                 *
                 */

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

                // Required for now. Basically a clearfix
                {
                  type: "section"
                }
              ]
            }
          ]
        };
        response.send(webhookResponse);
      break;
      }

      

      
  /** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


      Events from here down are only implemented for 
      the simple email reminder event. 


  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ **/
      
    /**
     *  TASK TRIGGERED
     *  Some time later (15 minutes in our case) the Gopher Task is triggered.
     *  See: https://docs.gopher.email/v1.0/reference#perfect-timing
     *  TIP: Use the Sandbox 🏝 to immediately fire trigger events.
     */
    case "task.triggered":
      /**
       *  APPLICATION LOGIC GOES HERE
       *  Pull CRM data, contact information, product pricing, news stories, inspirational content,
       *  etc. This is the magic moment when your Gopher Extension can save the day by delivering
       *  exactly the right information at exactly the right time.  Read more about
       *  perfectly timed emails: https://docs.gopher.email/v1.0/reference#perfect-timing
       */

      webhookResponse = {
        version: 1,
        send_messages: [
          {
            type: "email",

            // This can also be webhook.reference_email.from
            to: "name@example.com",
            from: "Gopher Express",
            subject: "Here is your reminder",
            body: [
              {
                type: "title",
                text: "A Few Minutes Later"
              },
              {
                type: "html",

                // Instead of a staic followup message, use whatever text the user
                // specificed in their settings: webhook.extension.private_data.followup_message
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

              /**
               * ACTION EMAIL
               * This button performs an email-based action. Clicking it composes a new email with a
               * pre-populated subject and body. When Gopher receives it, the task.action_received
               * event is fired. This allows users to get something done without leaving their inbox,
               * for example, completing a todo, adding a note, even ordering a pizza 🍕 (See below)
               */
              {
                type: "button",
                text: "Postpone 15min",
                action: "reschedule.15min",
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
     *  Handle when an action email is received. The webhook will contain the complete information
     *  within the email. Your extension can now perform specific actions the user has requested.
     *  Read more about action emails: https://docs.gopher.email/v1.0/reference#email-based-actions
     *
     */
    case "task.action_received":
      /**
       * APPLICATION LOGIC HERE
       * The user just clicked a button in one of your emails that says something like "complete task",
       * or "add notes", or "log a call". You can take the contents of their email (use the
       * Sandbox 🏝 to view the JSON request) and add notes, complete todo items and more, all
       * from their inbox. In this case, we are simply rescheduling the task.
       */
      webhookResponse = {
        version: 1,
        task: {
          // The action string in your button code can be referenced here. Ex: webhook.action.action.split('.')[1]
          trigger_timeformat: "15min"
        }
      };
      response.send(webhookResponse);
      break;

    /**
     *  Catch any other webhook responses. Otherwise we'll think your extension is failing and will
     *  send error messages. For all webhook events, view: https://docs.gopher.email/v1.0/reference#webhooks
     */
    default:
      response.send({});
      break;
  }
});

module.exports = router;
