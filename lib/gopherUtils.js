const Fut = require('fut-node');
const config = require('../config');
const fs = require('fs');
const path = require('path');

module.exports = {
  requireLogin: function(req, res, next) {
    var gopherClient = new Fut(config);
    console.log("You are logged into Gopher", req.cookies.gopherToken);
    if(req.cookies.gopherToken) {
      gopherClient.setAccessToken(req.cookies.gopherToken);
      req.app.set('gopherClient', gopherClient);
      return next();
    
    } else {
      res.redirect('/auth/login');
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
