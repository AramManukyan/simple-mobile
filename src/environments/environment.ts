// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { env } from './env';

export const environment = {
  production: env.production,
  apiBaseUrl: 'https://api.dhomie.app',
  signalRHubUrl: 'https://api.dhomie.app/hubs/items',
  appId: 'com.dhomie.mobile',
  appName: 'DHomie Mobile',
  serverUrl: 'https://localhost:3001',
  oauth: {
    issuer: 'https://auth.dhomie.app',
    clientId: 'dhomie-mobile',
    redirectUri: 'com.dhomie.mobile://auth/callback',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
    loginUrl: 'https://auth.dhomie.app/.well-known/openid-configuration',
  },
  env,
};

// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
