# Almost Done!

Now, Gopher needs to know the URL of your new extension. Enter it like this:
![Finish Setup](https://file-rzswqopban.now.sh/ "Finish setting up your extenion").

You just...
1. Right-click the the "show" button and <strong>copy</strong> (see above)
2. In the Gopher Admin (where you just were) and <strong>paste</strong> as the Base URL. 
3. In the Gopher Admin enter "Callback URI" as `[base-url]/auth/callback`.

# Gopher Express
Welcome to your new [Glitch-powered](https://glitch.com/) Gopher Extension! 

The code is well commented. Most of your work will be in: 
 * routes/gopherWebhooks – all email interactions happen via these webhooks
 * views/settings.html – welcome your users and build useful settings pages here
 * public/app.s – connect to other services and save your tokens using the methods shown here.

If you're having trouble, come find us in the [Gopher Slack Channel](http://slackin.gopheremail.com).

Note: If you haven't yet set up a Gopher Extension, [start by doing that](https://www.gopheremail.com/developer/create).

Read our [API Docs](https://developers.gopher.email) for more information.

## Exporting / Local Development
Gopher Express is just Node.js and Express, making it very flexible. To run your extension locally:
 * export to Github or Download (in Glitch's advanced settings)
 * run ```npm install```, then ```npm start```
 * map a domain to localhost with [ngrok](http://ngrok.io) or another service (see the `dev` script in package.json)
 * update `.env` to reflect your new hosting environment (copy from `.env.example')
 * create a new extension on gopher.email with that domain

## Deploying
Glitch is a great platform for prototyping. Once your extension is ready for deployment you can easily export your extension (above) and host on any other Node.js platform.