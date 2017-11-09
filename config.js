if(!process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
  console.log('Please fill out the settings in the .env file to connect with Gopher');
  process.exit();
}

const	extensionUrl = process.env.EXTENSION_URL;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const apiHost = process.env.API_HOST || 'https://www.gopher.email/';

module.exports = {
  extensionUrl: extensionUrl,
  apiHost: apiHost,
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: process.env.CALLBACK,
  tokenHost: apiHost,
  tokenPath: apiHost + 'api/v1/oauth2/access_token',
  authorizePath: apiHost + 'settings/oauth2_authorize',
  scope: 'get_user_info extension_manage_self'
}
