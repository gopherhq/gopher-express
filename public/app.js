function onAuthSuccess() {
	// Things you can do after user finishes authenticating
	// $('#setup-complete').removeClass('hide');
	// $('#command-settings').hide();
}

gopherLogIn(function(gopher) {

	gopher.fetchSettings(function(err, settings) {
		console.log(settings);
		if(err) {
			console.log(err);
			Cookies.remove('gopherToken');
			return gopher.displayError("Sorry, Gopher had trouble logging in. Please refresh the page to login again.");
		}
		if(!settings || (settings.gopherToken === 'undefined')) { //if the fut_auth_token has been removed on the server, remove from client.
			Cookies.remove('gopherToken');
			return location.reload();
		}
		$('#command-settings').removeClass('hide');		
		gopher.populateSettingsForm('.settings-form', '.fut-setting', settings);
		$('#memorize-settings').removeClass('hide');
		
	})

	$('.settings-form').submit(function() {
		gopher.submitSettingsForm(this, '.fut-setting');
		return false;
	});

});