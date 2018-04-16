/**
      ____             _               
     / ___| ___  _ __ | |__   ___ _ __ 
    | |  _ / _ \| '_ \| '_ \ / _ | '__|
    | |_| | (_) | |_) | | | |  __| |   
     \____|\___/| .__/|_| |_|\___|_|   
                |_|                    
    
    docs.gopher.email

    Need help? Get in touch!
    slack: slackin.gopheremail.com
    email: help+gopher@humans.fut.io

 */

require("dotenv").config();
const debug = require("debug")("gopher-express");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const gopherUtils = require("./lib/_gopherUtils");
const gopherAuth = require("./routes/_gopherAuth");
const config = require("./lib/_config");
app.use(cookieParser());

// Keep public/index.html for familiarity
app.set("view engine", "html");
app.engine("html", ejs.renderFile);
app.set("views", __dirname + "/public");

/**
 *
 * Your extension interacts with Gopher mainly via webhooks.
 * Open up  /routes/gopherWebhooks.js to learn more.
 *
 */
const webhooks = require("./routes/gopherWebhooks");
app.use("/webhooks", webhooks);

/**
 *
 * These pages can be used to welcome the user, updating
 * settings and any other task that requires a web-ui.
 * Edit public/index.html, public/settings.html, public/app.js and public/app.css to customize.
 *
 */
const templateVars = {
  sandboxUrl: config.gopherAdmin + "sandbox/" + config.extensionId + "?devtour=1",
  testEmail: "test@" + process.env.EXT_SUBDOMAIN + ".gopher.email",
  extDomain: process.env.EXT_SUBDOMAIN + ".gopher.email"
} 

app.get("/", gopherUtils.requireLogin, (req, res) => {
  res.render("index", templateVars);
});

app.get("/settings", gopherUtils.requireLogin, (req, res) => {
  res.render("settings", templateVars);
});


/**
 *
 * A few examples of using the API client.
 * View more API methods https://github.com/gopherhq/gopherhq-js
 *
 */
const exampleRoutes = require("./routes/gopherApi");
app.use(exampleRoutes);

app.use("/auth", gopherAuth);
app.use("/utils.js", gopherUtils.requireLogin, gopherUtils.jsTokenizer); // automatically populated with config values
app.use(express.static("public"));

const listener = app.listen(process.env.PORT || 3011, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
