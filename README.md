# Welcome to Glitch

This is a browser-based development environment created by [Fog Creek](https://www.fogcreek.com/) that contains an editable copy of [Gopher Express](https://github.com/gopherhq/gopher-express), our open source starter extension.

### ⏱ Getting things ready

Glitch will take ~30 seconds to set up a dev for your new extension. Open the logs (on the left) to check progress.

**Click the "show" button after it goes green.**
![Click the "show" btton in the top left after it goes green](https://fut-cdn.s3.amazonaws.com/gopher/glitch-green-show-button.png)

# Gopher Express

Gopher Express is an open source Gopher Extension to jumpstart your next [great idea](trello.com/b/AhYnpKqa/gopher-extension-ideas).

The code is well commented with examples and links to docs throughout.

Most of your work will be in:

* `routes/gopherWebhooks` – all email interactions happen via these webhooks
* `public/index.html` – welcome your users and build useful settings pages here
* `public/app.js` – connect to other services and save your tokens in the Gopher Core API using the methods shown here.

Note: If you did not arrive here from the Gopher Admin UI, [start by setting up a new extension](https://www.gopheremail.com/developer/create).

## Architecture

Gopher interacts with your extension primarily via webhooks. When an event happens in Gopher
(ex: an email is received), it sends a webhook (HTTP POST) to the extension. The extension
responds to the webhook with JSON that tells Gopher what to do. [More About Architecture](https://docs.gopher.email/v1.0/reference#architecture)

The extension also handles the OAuth login process and provides a page to let the user
manage their extension settings (see `public/index.html`).

Read the Gopher [API Docs](https://docs.gopher.email) to learn about the Gopher platform. Also, [join us in Slack](http://slackin.gopheremail.com/) or [send us an email](help+gopher@humans.fut.io) with any questions.

## Exporting / Local Development

Gopher Express uses Node.js and Express. To run your extension locally:

* export to Github or Download (in Glitch's advanced settings)
* run `npm install`, then `npm run dev`
* to allow the Gopher API to send webhooks to your extension,
  run `npm run ngrok` to map a publicly accessible domain to your local install
* copy `.env.example` into `.env` and add your environment details
* edit your extension's settings on gopher.email to reflect your new environment.

## Deploying

Most instances of Gopher Express will start on Glitch. Once your extension is ready for deployment you can easily export your extension (above) and host it on any Node.js platform, for example [Heroku](https://www.heroku.com/) or [Zeit](https://zeit.co/now).
