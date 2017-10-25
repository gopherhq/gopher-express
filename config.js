// STAGING
// const	extensionUrl = 'https://gopher-express.glitch.me/';
// const clientId = 'ext_a289678a8cf03f25773cd8f49eb336a8';
// const clientSecret = '67c576d81be15cb1cbef1e4bf7bfd21a065d95e171d1ac5a0a52e6c1654dd618';
// const apiHost = 'http://staging1.www.gopher.email/';

// PROD
const	extensionUrl = 'https://gopher-express.glitch.me/';
const clientId = 'ext_9f60fb6e24bbe5d5b27100636b0c84fb';
const clientSecret = '38032774a8c03581a70b560daef721c896a56e5942e0686cc46ac5cc1e14a1fd';
const apiHost = 'https://www.gopher.email/';

module.exports = {
  extensionUrl: extensionUrl,
  apiHost: apiHost,
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: extensionUrl + 'auth/callback',
  tokenHost: apiHost,
  tokenPath: apiHost + 'api/v1/oauth2/access_token',
  authorizePath: apiHost + 'settings/oauth2_authorize',
  scope: 'get_user_info extension_manage_self manage_reminders read_reminders manage_logs read_logs read_tasks manage_tasks',
  state: '49afjdskfdsjlk'
}