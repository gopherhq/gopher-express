# Welcome to Glitch

This is a browser-based development environment created by [Fog Creek](https://www.fogcreek.com/) that contains an editable copy of [Gopher Express](https://github.com/gopherhq/gopher-express).

### ⏱ Getting things ready

Glitch will take ~30 seconds to set up a dev for your new extension. Open the logs (on the left) to check progress.

Click the "show button" after it goes green.
![Click "show" after it goes green](https://fut-cdn.s3.amazonaws.com/gopher/glitch-green-show-button.png)

# Gopher Express

Gopher Express is an open source project for creating Gopher Extensions.

The code is well commented with examples and links to docs throughout.

Most of your work will be in:

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
