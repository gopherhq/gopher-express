(Alpha Release)
Gopher Express – A Gopher Extension Starter Kit
=========================
This starter kit is based on [Glitch](https://glitch.com/), a hosted platfrom to build that makes it simple to edit and publish applications.

Start your Gopher Extension right in your browser by "remxing" this one. When you click "Remix This" below, it will create an editable copy Gopher Express under your account.

## [Remix This](https://glitch.com/edit/#!/remix/gopher-express)

Once that is done, set up a new new Gopher Extension in the Gopher Admin UI, edit the values in configuration variables 

You can also save your source code and run the extension locally (or on any other provider):
 * Export to Github or Download (advanced settings)
 * In the directory, run ```npm install```, then ```npm start```
 * map a domain to localhost with [ngrok](http://ngrok.io)
 * create a new extension on gopher.email with that domain
 * copy config.example.js to config.js

## Todos:
- [ ] Run webhook middleware only within /on*/ routes (ex: onCommand)
- [ ] More Demo email examples (copy / pastable from API docs)
- [ ] Process State variable