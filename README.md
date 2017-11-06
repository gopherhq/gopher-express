# Gopher Express 
Welcome to your new [Glitch-powered](https://glitch.com/) Gopher Extension! To finish setting up your extension.

1. Copy your "Base URL" by right-clicking the "show" button in the top-left. ![get the base URL](https://cdn.glitch.com/3073062a-4a90-4160-b5ba-145429e03fdb%2Fpublic-url.png?1509581506608). Paste this in your extension settings.
2. Enter the "Callback URI" Gopher setting as `[base-url]/auth/callback`. (For example: `https://gopher-express.glitch.me/auth/callback`).

After you've finished the setup, try logging in by clicking the sun glasses and read our [API documentation](https://developers.gopher.email/#quickstart-glitch).

If you haven't yet started setting your Gopher Extension, see below.

### Creating A New Gopher Extension
This [Gopher](https://www.gopher.email) Extension starter kit is based on [Glitch](https://glitch.com/), but uses standard Node.js tools that can be hosted anywhere.

To get started, [create a Gopher Extension](https://www.gopheremail.com/developer/create) from the Gopher Developer Portal .

You can also [remx](https://glitch.com/edit/#!/remix/gopher-express) this Gopher Extension right now and set it up with Gopher later.

Read the [Glitch quickstart](https://developers.gopher.email/#quickstart-glitch) guide for more information.


## Exporting 
Note: Gopher Express is based on the popular Node.js Express framework which means it can be hosted anywhere. To get this running locally, for example:
 * export to Github or Download (in advanced settings)
 * run ```npm install```, then ```npm start```
 * map a domain to localhost with [ngrok](http://ngrok.io)
 * copy config.example.js to config.js
 * create a new extension on gopher.email with that domain