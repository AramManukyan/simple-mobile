export interface OidcPlatformConfig {
  clientId: string;
  redirectUri: string;
}

export interface OidcConfig {
  issuer: string;
  clientId: string;
  scope: string;
  redirectUri: string;
  responseType: string;
  showDebugInformation: boolean;
  useSilentRefresh: boolean;
  android?: OidcPlatformConfig;
  ios?: OidcPlatformConfig;
}

export interface MicroEnv {
  production: boolean;
  microApiBaseUrl: string;
  defaultLanguage: string;
  routes: {
    homePath: string;
    callbackPath: string;
  };
  oidc: OidcConfig;
}
