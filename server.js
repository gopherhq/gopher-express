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
 * Your extension interacts with Gopher mainly via webhooks.
 * Open up  /routes/gopherWebhooks.js to learn more.
 *
 */
const webhooks = require("./routes/gopherWebhooks");
app.use("/webhooks", webhooks);

/**
 *
 * Your public HTML page is for a user's first time login, for updating
 * their settings and for any other task that requires a web-ui.
 * Edit public/index.html, public/app.js and public/app.css to customize.
 *
 */
app.get("/", gopherUtils.requireLogin, (req, res) => {
  res.render("index");
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
