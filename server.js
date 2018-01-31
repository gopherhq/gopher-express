require("dotenv").config();
const debug = require("debug")("gopher-express");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const gopherUtils = require("./lib/gopherUtils");
const gopherAuth = require("./routes/gopherAuth");
app.use(cookieParser());

/**
 *
 * Process and respond to webhooks in /routes/gopherWebhooks.js
 *
 */
const webhooks = require("./routes/gopherWebhooks");
app.use("/webhooks", webhooks);

/**
 *
 * API Examples using the Gopher Client
 *
 */
const exampleRoutes = require("./routes/node-api-examples");
app.use(exampleRoutes);

/**
 *
 * Edit public/index.html, public/app.js and public/app.css to update your settings page
 *
 */
app.get("/", gopherUtils.requireLogin, (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

app.use("/auth", gopherAuth);
app.use("/utils.js", gopherUtils.requireLogin, gopherUtils.jsTokenizer); // automatically populated with config values
app.use(express.static("public"));

const listener = app.listen(process.env.PORT || 3011, function() {
	console.log("Your app is listening on port " + listener.address().port);
});
