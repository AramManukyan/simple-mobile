export const environment = {
  production: true,
  apiBaseUrl: 'https://api.dhomie.app',
  signalRHubUrl: 'https://api.dhomie.app/hubs/items',
  appId: 'com.dhomie.mobile',
  appName: 'DHomie Mobile',
  serverUrl: '',
  oauth: {
    issuer: 'https://auth.dhomie.app',
    clientId: 'dhomie-mobile',
    redirectUri: 'com.dhomie.mobile://auth/callback',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: false,
    loginUrl: 'https://auth.dhomie.app/.well-known/openid-configuration',
  },
};
