const Fut = require('fut-node');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const gopherClient = new Fut(config);
const _ = require('lodash');

module.exports = {
  requireLogin: function(req, res, next) {
    if (req.cookies.gopherToken) {
      console.log("You are logged into Gopher", req.cookies.gopherToken);
      gopherClient.setAccessToken(req.cookies.gopherToken);
      req.app.set('gopherClient', gopherClient);
      return next();
    
    } else {
      res.redirect('/auth/login');
    }
  },
  
  validateWebhook: function (req, res, next) {
    const validateTimestamp = true;
    console.log(req.headers['x-fut-signature'], req.headers['x-fut-timestamp'], req.rawBody);

    if (gopherClient.validateWebhook(req.headers['x-fut-signature'], req.headers['x-fut-timestamp'], req.rawBody, validateTimestamp)) {
      console.log('Webhook validated!');
      let accessToken = _.get(req, 'extension.private_data.fut_access_token') || _.get(req, 'extension.public_data.fut_access_token');
      if (accessToken) {
        gopherClient.setAccessToken(accessToken);
        console.log('The Gopher API client is authenticated and at your service, available withnin any webhook handler');        
      } else {
        console.log('You can successfully send and process webhooks. The user has not yet authenticated their extension, so API calls cannot be made.');
      }
      return next();
      
    } else {
      return next('Webhook validation failed');
    }
  },
    
  jsTokenizer: function(req, res, next) {
    const jsFile = path.resolve(__dirname, '../public/_gopher.js');
    console.log(jsFile);
    const stat = fs.statSync(jsFile);
    let loadedFile = fs.readFileSync(jsFile, 'utf-8');
    loadedFile = loadedFile.replace('{{ baseUrl }}', config.extensionUrl);
    res.set({
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        'Content-Type': 'text/javascript',
        'Content-Length': stat.size
      });
    return res.send(loadedFile);
  }
}
