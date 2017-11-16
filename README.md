# Setup: You're Almost Done 

Gopher needs to know the URL of your new extension. Enter it like this: ![get the base URL](https://cdn.glitch.com/3073062a-4a90-4160-b5ba-145429e03fdb%2Fpublic-url.png?1509581506608). Paste this in your extension settings.

1. Right-click the the "show" button and <strong>copy</strong> (see above)
2. In the Gopher Admin (where you just were) and <strong>paste</strong> as the Base URL. 
3. In the Gopher Admin enter "Callback URI" as `[base-url]/auth/callback`.

### Welcome!
Welcome to your new [Glitch-powered](https://glitch.com/) Gopher Extension! We will assume you are set up and connected to Gopher. If you're having rouble, come find us in the [Gopher Slack Channel](http://slackin.gopher.email).

This [Gopher](https://www.gopher.email) Extension starter kit is based on [Glitch](https://glitch.com/), but uses standard Node.js tools, so you host it anywhere.

If you haven't done so already, [create a Gopher Extension](https://www.gopheremail.com/developer/create) from the Gopher Developer Portal and follow the instrucitons there to connect it to Glitch.

You can also [remx](https://glitch.com/edit/#!/remix/gopher-express) this Gopher Extension right now and set it up with Gopher later.

Read the [Glitch quickstart](https://developers.gopher.email/#quickstart-glitch) guide for more information.


## Exporting 
Note: Gopher Express is based on the popular Node.js Express framework which means it can be hosted anywhere. To get this running locally, for example:
 * export to Github or Download (in advanced settings)
 * run ```npm install```, then ```npm start```
 * map a domain to localhost with [ngrok](http://ngrok.io)
 * copy config.example.js to config.js
 * create a new extension on gopher.email with that domain