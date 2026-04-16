import type { MicroEnv } from './env.model';

export const env: MicroEnv = {
  production: false,
  oidc: {
    issuer: 'https://thehood-dev-uae-api.azurewebsites.net',
    clientId: 'mobile',
    scope: 'openid profile offline_access app',
    redirectUri: 'https://localhost:3001/login-callback',
    responseType: 'code',
    showDebugInformation: true,
    useSilentRefresh: false,
    android: {
      clientId: 'android',
      redirectUri: 'com.thehood.app:/callback',
    },
    ios: {
      clientId: 'ios',
      redirectUri: 'thehoodapp:/callback',
    },
  },
  microApiBaseUrl: 'https://thehood-dev-uae-api.azurewebsites.net',
  routes: {
    homePath: 'app',
    callbackPath: 'login-callback',
  },
  defaultLanguage: 'am',
};
