import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.monapp.listecourses',
  appName: 'Ma Liste de Courses',
  webDir: 'dist',
  android: {
    buildOptions: {
      releaseType: 'APK',
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#22c55e',
      showSpinner: false,
    },
  },
};

export default config;
