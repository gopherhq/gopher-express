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

// customize gopherWebhooks.js to change behavior
const webhooks = require('./routes/gopherWebhooks');

//OAuth2 workflow. You shouldn't have to customize this
const gopherAuth = require('./routes/gopherAuth');

// gopher js with config options augomagically included
app.use('/gopher.js', gopherUtils.jsTokenizer); 


// hooking it all up
app.use('/', webhooks);
app.use('/auth', gopherAuth);
// app.use(gopherUtils.requireLogin); //reques auth from here down

app.get('/', gopherUtils.requireLogin, (req, res) => {
  res.sendFile(__dirname + '/public/settings.html');
});


var listener = app.listen(process.env.PORT || 3002, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
