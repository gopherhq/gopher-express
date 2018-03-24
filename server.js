require("dotenv").config();
const debug = require("debug")("gopher-express");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const gopherUtils = require("./lib/gopherUtils");
const gopherAuth = require("./routes/gopherAuth");
app.use(cookieParser());

// Keep public/index.html for familiarity
app.set("view engine", "html");
app.engine("html", ejs.renderFile);
app.set("views", __dirname + "/public");

/**
 *
 * Process and respond to webhooks in /routes/gopherWebhooks.js
 *
 */
const webhooks = require("./routes/gopherWebhooks");
app.use("/webhooks", webhooks);

/**
 *
 * Edit public/index.html, public/app.js and public/app.css to update your settings page
 *
 */
app.get("/", gopherUtils.requireLogin, (req, res) => {
  res.render("index");
});

/**
 *
 * API Examples using the Gopher Client
 *
 */
const exampleRoutes = require("./routes/nodeApiExamples");
app.use(gopherUtils.requireLogin, exampleRoutes);

app.use("/auth", gopherAuth);
app.use("/utils.js", gopherUtils.requireLogin, gopherUtils.jsTokenizer); // automatically populated with config values
app.use(express.static("public"));

const listener = app.listen(process.env.PORT || 3011, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
