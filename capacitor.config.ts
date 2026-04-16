import type { CapacitorConfig } from '@capacitor/cli';
import { environment } from './src/environments/environment';

const config: CapacitorConfig = {
  appId: environment.appId,
  appName: environment.appName,
  webDir: 'www',
  server: environment.serverUrl
    ? {
        url: environment.serverUrl,
        cleartext: true,
      }
    : undefined,
};

export default config;
