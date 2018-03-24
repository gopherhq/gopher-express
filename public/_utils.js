/**
    Utility Scripts
    This provides the basic front-end logic to make the UI work. 
    If you have custom js, add it to app.js, not here. This will likely
    be updated over time.
 */

// Globals
var Cookies = window.Cookies;
var _ = window._;
var NProgress = window.NProgress;
var gopherBaseUrl = "{{ gopherBaseUrl }}";

var gopherClient = new Gopher({
  clientId: "ext_be659a394e913e1cd0019053bb6b0e86",
  apiHost: gopherBaseUrl
});

gopherClient.setAccessToken(Cookies.get("gopherToken"));

function displayError(err) {
  $("#error")
    .text("")
    .append("<p>Error: " + err + "</p>")
    .removeClass("hide");
  window.scrollTo(0, 0);
}

function displaySuccess(message) {
  $("#success")
    .text("")
    .append(message)
    .removeClass("hide");
  window.scrollTo(0, 0);
}

function populateSettingsForm(formElement, formItemSelector, settings) {
  var form = $(formElement);

  if (!settings) return;

  _.forEach(form.find(formItemSelector), function(settingsField) {
    switch (settingsField.type) {
      case "checkbox":
        settingsField.checked = settings[settingsField.id] == true;
        break;
      case "radio":
        if (settingsField.value === settings[settingsField.name]) {
          settingsField.checked = true;
        }
        break;
      default:
        settingsField.value = settings[settingsField.id] || "";
    }
  });
}

function submitSettingsForm(formElement, formItemSelector) {
  var formData = {};

  _.forEach($(formElement).find(formItemSelector), function(settingsField) {
    switch (settingsField.type) {
      case "checkbox":
        formData[settingsField.id] = settingsField.checked ? 1 : 0;
        break;
      case "radio":
        if (settingsField.checked)
          formData[settingsField.name] = settingsField.value;
        break;
      default:
        formData[settingsField.id] = settingsField.value;
    }
  });

  return gopherClient.saveExtensionData(formData);
}

function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}

$(function() {
  //populate settings
  NProgress.start();
  gopherClient
    .getExtensionData()
    .then(function(settings) {
      NProgress.done();
      $(".settings-form").removeClass("hide");
      populateSettingsForm(".settings-form", ".fut-setting", settings.data);
    })
    .catch(function(err) {
      NProgress.done();
      console.log("Error fetching settings", err || settings);
      Cookies.remove("gopherToken");
      return displayError(
        "Sorry, Gopher had trouble logging in. Please refresh the page to login again."
      );
    });

  // handle form submission
  $(".settings-form").submit(function() {
    debugger;
    NProgress.start();
    submitSettingsForm(this, ".fut-setting")
      .then(function(res) {
        displaySuccess("Settings saved!");
        NProgress.done();
      })
      .catch(function(err) {
        NProgress.done();
        displayError("There was an error saving your settings");
        console.log("Error", err);
      });
    return false;
  });

  // logout
  $("#logout").click(function() {
    console.log("logout");
    Cookies.remove("gopherToken");
    window.location.reload();
  });
});
