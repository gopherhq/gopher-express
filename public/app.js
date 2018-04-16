/**
    Add your custom JS in this file    
    Some handy functions have already been set up globally (from _util.js).
    
    gopherClient - An authenticated instance of gopherhq https://github.com/gopherhq/gopherhq-js
    displaySuccess(message) - Show success message
    displayError(message) - Show error message
    getUrlParameter(paramName) - Get value of named parameter
    
 */

$(function() {
  // Welcome new users
  if (window.getUrlParameter("welcome")) {
    $("#welcome").removeClass("hide");
    window.displaySuccess("Extension successfully installed!");

    // After first login, save the auth token so it arrives on future webhooks
    window.gopherClient
      .saveExtensionData({ gopher_token: window.Cookies.get("gopherToken") })
      .catch(function(err) {
        window.displayError(
          "There was an error saving your Gopher settings. Please contact the extension developer. The error was: " +
            err.message
        );
      });

    // Add more initialization steps here. (Auth with CRM, ToDo list). Save them as above.
  }

  // Add custom JS handlers here.
});


(function loadExtensionData() {
  
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.gopher.email/api/v1/extensions/1489",
  "method": "GET",
  "headers": {
    "Content-Type": "application/json",
    // "Authorization": "Bearer " + Cookies.get('gopherToken'),
    "Cache-Control": "no-cache",
    "Postman-Token": "1f36136e-389b-4f99-92da-70d5ca06e067"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

})();