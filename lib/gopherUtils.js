const Fut = require('fut-node');
const config = require('../config');
const fs = require('fs');
const path = require('path');

module.exports = {
  authMiddleware: function(req, res, next) {
    var gopherClient = new Fut(config.fut);

    console.log(req.cookies.gopherToken);
    // authToken stored only in cookie, set on gopherClient with every request.
    if(req.cookies.gopherToken) {
      gopherClient.setAccessToken(req.cookies.gopherToken);
    }
    req.app.set('gopherClient', gopherClient);
    next();
  }, 
    
  jsTokenizer: function(req, res, next) {
    const jsFile = path.resolve(__dirname, '../public/_gopher.js');
    console.log(jsFile);
    const stat = fs.statSync(jsFile);
    let loadedFile = fs.readFileSync(jsFile, 'utf-8');
    loadedFile = loadedFile.replace('{{ baseUrl }}', config.baseUrl);
    loadedFile = loadedFile.replace('{{ redirectUri }}', config.fut.redirectUri);
    res.set({
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true,
        'Content-Type': 'text/javascript',
        'Content-Length': stat.size
      });
    res.send(loadedFile);
  }
}
