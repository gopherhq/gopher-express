const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
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
app.use('/webhooks', webhooks);
app.use(gopherUtils.authMiddleware); //reques auth from here down
app.use('/auth', gopherAuth);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


var listener = app.listen(process.env.PORT || 3002, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
