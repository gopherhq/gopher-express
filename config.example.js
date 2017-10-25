var extensionUrl
	,clientId
	,clientSecret
	,gopherUrl;

process.env.DEV = true; // TODO: Set up .env

if (process.env.DEV) {
	/////////////////LOCAL PLUGIN STAGING API/////////////////////////////////////////////
	extensionUrl = 'https://gopher-glitch-starter.glitch.me/';
	clientId = 'ext_9f60fb6e24bbe5d5b27100636b0c84fb';
	clientSecret = '38032774a8c03581a70b560daef721c896a56e5942e0686cc46ac5cc1e14a1fd';
	gopherUrl = 'https://www.gopher.email/';
	/////////////////////////////////////////////////////////////////////////////////////////////////////////LOCAL PLUGIN STAGING API/////////////////////////////////////////////

} else {
	/////////////////SERVERLESS PLUGIN PRODUCTION API  (sls deploy --stage prod) //////////////
	extensionUrl = 'https://oqyn200ft7.execute-api.us-east-1.amazonaws.com/prod/';
	clientId = 'ext_60fa1f66f985177140a1d41ff8c26de5';
	clientSecret = '9f4c14460d340a866aa6d9aba38239fc8bfb99896a2609c777f888151a010073';
	gopherUrl = 'https://www.gopher.email/';
	/////////////////////////////////////////////////////////////////////
}


const config = {
	baseUrl: extensionUrl,
	gopherUrl: gopherUrl,
	fut: {
		clientId: clientId,
		clientSecret: clientSecret,
		tokenHost: gopherUrl,
		apiHost: gopherUrl,
		tokenPath: gopherUrl + 'api/v1/oauth2/access_token',
		authorizePath: gopherUrl + 'settings/oauth2_authorize',
		redirectUri: extensionUrl + 'auth/callback',
		scope: 'get_user_info extension_manage_self manage_reminders read_reminders manage_logs read_logs read_tasks manage_tasks'
	}
}

module.exports = config;
