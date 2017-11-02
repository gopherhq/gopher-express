# Gopher Express 
If you just arrived here from the Gopher Extension page then congratulations, you have a complete Gopher Extension with an editing environment! 

First, try to edit a couple files. If you can't, you'll have to [remix this](https://glitch.com/edit/#!/remix/gopher-express) to create an editable copy of your own.

Next we'll connect this extension to the Gopher API. 

* Get the "Base URL" of your extension by right-clicking the "show" button in the top-left. ![get the base URL](https://cdn.glitch.com/3073062a-4a90-4160-b5ba-145429e03fdb%2Fpublic-url.png?1509581506608)
* Now, [create an extension](https://www.gopheremail.com/developer/create) if you have not done so already.
* Take the `client_id`, `client_secret` and `callback_ 



### A Gopher Extension Starter Kit
(Alpha Release)

This starter kit is based on [Glitch](https://glitch.com/), a hosted platfrom to build that makes it simple to edit and publish applications.

Start your Gopher Extension right in your browser by "remxing" this one. When you click "Remix This" below, it will create an editable copy Gopher Express under your account.

## [Remix This](https://glitch.com/edit/#!/remix/gopher-express)

Next, set up a new new Gopher Extension in the Gopher Admin UI, edit the values in configuration variables.

Read the [Glitch quickstart](https://developers.gopher.email/#quickstart-glitch) guide for more information.

Note: You can save your source code and run the extension locally (or on any other provider):
 * Export to Github or Download (advanced settings)
 * In the directory, run ```npm install```, then ```npm start```
 * map a domain to localhost with [ngrok](http://ngrok.io)
 * create a new extension on gopher.email with that domain
 * copy config.example.js to config.js

## Todos:
- [ ] Run webhook middleware only within /on*/ routes (ex: onCommand)
- [ ] More Demo email examples (copy / pastable from API docs)
- [ ] Process State variable