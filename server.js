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
const gopherUtils = require("./lib/gopherUtils");
const gopherAuth = require("./routes/gopherAuth");
const config = require("./lib/config");
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
 * Your index page can be used to welcome the user, updating
 * settings and any other task that requires a web-ui.
 * Edit public/index.html, public/app.js and public/app.css to customize.
 *
 */
app.get("/", gopherUtils.requireLogin, (req, res) => {
  const sandboxUrl =
    config.gopherAdmin + "sandbox/" + config.extensionId + "?devtour=1";
  res.render("index", { sandboxUrl: sandboxUrl });
});

/**
 *
 * A few examples of using the API client.
 * View more API methods https://github.com/gopherhq/gopherhq-js
 *
 */
const exampleRoutes = require("./routes/nodeApiExamples");
app.use(exampleRoutes);

app.use("/auth", gopherAuth);
app.use("/utils.js", gopherUtils.requireLogin, gopherUtils.jsTokenizer); // automatically populated with config values
app.use(express.static("public"));

const listener = app.listen(process.env.PORT || 3011, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
