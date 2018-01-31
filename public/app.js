$(function() {
  var Cookies = window.Cookies;

  // Your custom JS goes here
  // _utils.js handles the settings form and provides utilities.
  // An autheneticated Gohper Client and jQuery are available. Onward! 🚀

  // Handle newly authenticated users
  if (getUrlParameter("welcome")) {
    $("#welcome").removeClass("hide");
    displaySuccess("Extension successfully installed!");
    // displayError("Something went wrong");

    // silently save gopherToken to API so it arrives with future webhooks
    gopherClient
      .saveExtensionData({ gopher_token: Cookies.get("gopherToken") })
      .catch(function(err) {
        displayError(
          "There was an error saving your Gopher settings. Please contact the extension developer. The error was: " +
            JSON.stringify(err)
        );
      });
  }
});
