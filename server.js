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
const gopherAuth = require('./routes/gopherAuth');
const gopherUtils = require('./lib/gopherUtils');

app.use((req, res, next) => {
  console.log('here');
  next();
})

// Most of your email-handling work will be here (routes/gopherWebhook)
const webhooks = require('./routes/gopherWebhooks');

app.use('/auth', gopherAuth);
app.use('/gopher.js', gopherUtils.requireLogin, gopherUtils.jsTokenizer);  // automatically populated with config values
app.get('/', gopherUtils.requireLogin, (req, res) => {
  res.sendFile(__dirname + '/public/settings.html');
});
app.use(webhooks);

const listener = app.listen(process.env.PORT || 3002, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
