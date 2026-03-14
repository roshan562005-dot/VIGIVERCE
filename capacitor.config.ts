import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.roshan.vigiverse',
  appName: 'VigiVerse',
  webDir: 'public', // Set to public since we are serving directly from Vercel
  bundledWebRuntime: false,
  server: {
    // ⚠️ IMPORTANT: Replace this with your actual Vercel Production URL!
    url: 'https://vigiverse.vercel.app', 
    cleartext: true
  }
};

export default config;
