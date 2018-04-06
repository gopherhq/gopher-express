/**
        ____             _               
      / ___| ___  _ __ | |__   ___ _ __ 
    | |  _ / _ \| '_ \| '_ \ / _ | '__|
    | |_| | (_) | |_) | | | |  __| |   
      \____|\___/| .__/|_| |_|\___|_|   
                |_|                    

    Need help? Get in touch!
    slack: slackin.gopheremail.com
    email: help+gopher@humans.fut.io

    Add your custom JS in this file
    - _utils.js handles the settings form and provides utilities you can use here.
    - An autheneticated Gohper Client and jQuery are already available to you.
    - This is an early release. Things can change quickly, and feedback is welcome!    
 */

$(function() {
  var Cookies = window.Cookies;

  // Handle newly authenticated users
  if (getUrlParameter("welcome")) {
    $("#welcome").removeClass("hide");
    displaySuccess("Extension successfully installed!");
    // displayError("An example of an error message");

    // Save the gopherToken so it arrives with future webhooks
    gopherClient
      .saveExtensionData({ gopher_token: Cookies.get("gopherToken") })
      .catch(function(err) {
        displayError(
          "There was an error saving your Gopher settings. Please contact the extension developer. The error was: " +
            err.message
        );
      });

    // If your extension requires additional api access, initiate more oauth
    // connections here. Save them to Gopher as shown below.
  }
});
