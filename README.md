## Click the "show" button after it turns green

This will connect your extension with Gopher so the two systems can talk.

![Click the "show" btton in the top left after it goes green](https://fut-cdn.s3.amazonaws.com/gopher/glitch-green-show-button.png)

... ⏱ it should only take [Glitch](http://glitch.com/) a miinute to create your editable copy of our open source starter extension. While you're waiting, read on.

# Gopher Express

Gopher Express is an open source Gopher Extension to kickstart your next great idea. Need inspiration? Visit the [Gopher Extension Idea Board](https://trello.com/b/AhYnpKqa/gopher-extension-ideas).

## What does it do?

Out of the box, it's a simple email reminder.

If you send an email to [anything]@[your-extension-domain].gopher.email, you will receive en email reminder in 15 minutes.
]

## How does it work?

* When a user emails [anything]@[your-extension].gopher.email, Gopher fires the `task.created` webhook to your extension, which is handled in `routes/gopherWebhooks`.

* When a reminder becomes due, Gopher fires the `task.triggered` webhook, again handled in `routes/gopherWebhooks.js`

* User settings and the OAuth connection process are handled in `public/index.html`.

The code is well commented with examples and links to docs throughout, so have a look around.

## Exporting / Local Development

Gopher Express just uses Node.js and Express, making it very portable.

To run your extension locally:

* export to Github or Download (in Glitch's advanced settings)
* run `npm install`, then `npm run dev`
* to allow the Gopher API to send webhooks to your extension,
  run `npm run ngrok` to map a publicly accessible domain to your local install
* copy `.env.example` into `.env` and add your environment details
* edit your extension's settings on gopher.email to reflect your new environment.

From here you can easily deploy your extension to [Heroku](https://www.heroku.com/), [Zeit](https://zeit.co/now) or any other Node.js platform.

## Contributing

Create issues, provide feedback or issue PRs on the [Gopher Express Github Repo](https://github.com/gopherhq/gopher-express)

## Help

* If you did not arrive here from the Gopher Admin UI, [start by setting up a new extension](https://www.gopheremail.com/developer/create).
* Read the Gopher [API Docs](https://docs.gopher.email) to learn about the Gopher platform.
* [Join us in Slack](http://slackin.gopheremail.com/) or [send us an email](help+gopher@humans.fut.io) with feedback!
