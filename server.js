require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
app.use(bodyParser.json({
  verify: function(req, res, buf, encoding) {
    req.rawBody = buf.toString();
  }
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
const gopherUtils = require('./lib/gopherUtils');

app.use((req, res, next) => {
  console.log('extension contacted');
  next();
});

/**
 * 
 * Process and respond to webhooks in /routes/gopherWebhooks.js
 * 
*/
const webhooks = require('./routes/gopherWebhooks');
app.use(webhooks);
const gopherAuth = require('./routes/gopherAuth');
app.use('/auth', gopherAuth);
app.use('/gopher.js', gopherUtils.requireLogin, gopherUtils.jsTokenizer);  // automatically populated with config values


/**
 * 
 * Edit public/settings.html to update the settings page
 * 
*/
app.get('/', gopherUtils.requireLogin, (req, res) => {
  res.sendFile(__dirname + '/public/settings.html');
});


const listener = app.listen(process.env.PORT || 3011, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
