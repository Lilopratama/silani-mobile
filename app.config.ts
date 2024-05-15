import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
   ...config,
   name: "Silani",
   slug: "silani",
   version: process.env.APP_VERSION || "1.0.0",
   orientation: "portrait",
   icon: "./assets/images/icon.png",
   scheme: "silani",
   userInterfaceStyle: "automatic",
   splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
   },
   ios: {
      supportsTablet: true,
      config: {
         usesNonExemptEncryption: false,
      },
      bundleIdentifier: "com.anonymous.silani",
   },
   android: {
      adaptiveIcon: {
         foregroundImage: "./assets/images/adaptive-icon.png",
         backgroundColor: "#ffffff",
      },
      package: "com.anonymous.silani",
   },
   web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
   },
   plugins: ["expo-router", "expo-font", "expo-secure-store"],
   experiments: {
      typedRoutes: true,
   },
});
