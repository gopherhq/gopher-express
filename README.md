# Welcome to Glitch

This is a browser-based development environment created by [Fog Creek](https://www.fogcreek.com/) that contains an editable copy of [Gopher Express](https://github.com/gopherhq/gopher-express).

# One last step

Gopher needs one last setting to complete setup: The base URL.

To set this:

1.  Copy the public URL of your Glitch project:
    ![Copy your Glitch project public URL from the menu in the upper-left](https://fut-cdn.s3.amazonaws.com/gopher/step1-anim.gif)

2.  On your extension page in the Gopher Admin UI, click this link:
    ![On your Extenion Settings page, click this link](https://fut-cdn.s3.amazonaws.com/gopher/step2.png)

3.  Paste your settings into the Base URL field.
    ![Paste the value of your Base URL](https://fut-cdn.s3.amazonaws.com/gopher/step3.png) (Gopher identifies you are using the Glitch Quickstart and fills in the other fields automatically)

4.  Click "Save" install your extension and you'll be ready to start building.

# Gopher Express

Welcome to Gopher Express!

The code is well commented. Most of your work will be in:

* routes/gopherWebhooks – all email interactions happen via these webhooks
* public/index.html – welcome your users and build useful settings pages here
* public/app.js – connect to other services and save your tokens in the Gopher Core API using the methods shown here.

If you're having trouble, send us an email: help+gopher@humans.fut.io.

Note: If you did not arrive here from the Gopher Admin UI, [start by setting up a new extension](https://www.gopheremail.com/developer/create).

Read our [API Docs](https://developer.gopher.email) for more information.

## Exporting / Local Development

Gopher Express uses Node.js and Express. To run your extension locally:

* export to Github or Download (in Glitch's advanced settings)
* run `npm install`, then `npm run dev`
* to allow the Gopher API to send webhooks to your extension,
  run `npm run ngrok` to map a publicly accessible domain to your local install
* copy `.env.example` into `.env` and add your environment details
* edit your extension's settings on gopher.email to reflect your new environment.

## Deploying

Glitch is a great platform for prototyping. Once your extension is ready for deployment you can easily export your extension (above) and host it on any Node.js platform, for example [Heroku](https://www.heroku.com/) or [Zeit Now](https://zeit.co/now).
