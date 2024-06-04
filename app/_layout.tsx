import { ReactQueryClientProvider } from "@/libs/ReactQuery";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import {
   RedHatDisplay_400Regular,
   RedHatDisplay_500Medium,
   RedHatDisplay_700Bold,
} from "@expo-google-fonts/red-hat-display";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, useRouter, useSegments } from "expo-router";
import SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
   async getToken(key: string) {
      try {
         return await SecureStore.getItemAsync(key);
      } catch (error) {
         return null;
      }
   },
   async saveToken(key: string, value: string) {
      try {
         return await SecureStore.setItemAsync(key, value);
      } catch (error) {
         return;
      }
   },
};

const InitialLayout = () => {
   const { isLoaded, isSignedIn } = useAuth();

   const router = useRouter();
   const segments = useSegments();

   useEffect(() => {
      if (isLoaded) return;

      const inTabsGroup = segments[0] === "(private)";

      if (isSignedIn && inTabsGroup) {
         router.replace("/home");
      } else if (!isSignedIn) {
         router.replace("/(public)");
      }
   }, [isSignedIn]);
   return (
      <ReactQueryClientProvider>
         <GestureHandlerRootView style={{ flex: 1 }}>
            <Slot />
         </GestureHandlerRootView>
      </ReactQueryClientProvider>
   );
};

export default function Root() {
   // Register Application fonts
   const [fontsLoaded, fontError] = useFonts({
      RedHatDisplay_400Regular,
      RedHatDisplay_500Medium,
      RedHatDisplay_700Bold,
   });

   // Load fonts
   useEffect(() => {
      const loadFonts = async () => {
         if (fontsLoaded) {
            await SplashScreen.hideAsync();
         }
      };
      loadFonts();
   }, [fontsLoaded, fontError]);

   // Handle error
   if (!fontsLoaded || fontError) {
      return null;
   }

   // console.log(process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);

   return (
      <ClerkProvider
         publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
         tokenCache={tokenCache}
      >
         <InitialLayout />
         {/* <ReactQueryClientProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
               <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="onboarding-second" />
                  <Stack.Screen name="sign-in-email" />
                  <Stack.Screen name="sign-in-options" />
                  <Stack.Screen name="sign-up" />
               </Stack>
            </GestureHandlerRootView>
         </ReactQueryClientProvider> */}
      </ClerkProvider>
   );
}
