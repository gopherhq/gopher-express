var Cookies = window.Cookies;

$(function() {
  
  //populate settings
  fetchSettings(function(err, settings) {
    console.log('Gopher Settings: ', settings);
    if(err || !settings) {
      console.log(err || settings);
      // Cookies.remove('gopherToken');
      // return displayError("Sorry, Gopher had trouble logging in. Please refresh the page to login again.");
    }
        
    $('.settings-form').removeClass('hide');
    populateSettingsForm('.settings-form', '.fut-setting', settings);
  });
  
  //  if they now just logged in
  if (getUrlParameter('welcome')) {
   displaySuccess('This Gopher Extension has been installed on your account and is ready for use');
  }

  // handle form submission
	$('.settings-form').submit(function() {
		submitSettingsForm(this, '.fut-setting');
		return false;
	});

});