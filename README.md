# Almost Done!

Now, Gopher needs to know the URL of your new extension. Enter it like this:
![Finish Setup](https://file-gvbyvnkcer.now.sh/ "Finish setting up your extenion").

You just...
1. Right-click the the "show" button and <strong>copy</strong> (see above)
2. In the Gopher Admin (where you just were) and <strong>paste</strong> as the Base URL. 
3. In the Gopher Admin enter "Callback URI" as `[base-url]/auth/callback`.

# Gopher Express
Welcome to your new [Glitch-powered](https://glitch.com/) Gopher Extension!  This [Gopher](https://www.gopher.email) Extension starter kit uses standard Node.js tools allowing you to host it anywhere.

The code is well commented. Most of your work will be in: 
 * routes/gopherWebhooks – all email interactions happen via these webhooks
 * views/settings.html – welcome your users and build useful settings pages here
 * public/app.s – connect to other services and save your tokens using the methods shown here.
 
If you're having trouble, come find us in the [Gopher Slack Channel](http://slackin.gopher.email).

Note: If you haven't yet set up a Gopher Extension, [start by doing that](https://www.gopheremail.com/developer/create).

Read our [API Docs](https://developers.gopher.email) for more information.

## Exporting 
Note: Gopher Express is based on the popular Node.js Express framework which means it can be hosted anywhere. To get this running locally, for example:
 * export to Github or Download (in Glitch's advanced settings)
 * run ```npm install```, then ```npm start```
 * map a domain to localhost with [ngrok](http://ngrok.io) or another service
 * update `.env` to reflect your new hosting environment
 * create a new extension on gopher.email with that domain