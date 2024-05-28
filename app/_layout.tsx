import { ReactQueryClientProvider } from "@/libs/ReactQuery";
import {
   RedHatDisplay_400Regular,
   RedHatDisplay_500Medium,
   RedHatDisplay_700Bold,
} from "@expo-google-fonts/red-hat-display";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function AuthLayout() {
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

   return (
      <ReactQueryClientProvider>
         <GestureHandlerRootView>
            <Stack>
               <Stack.Screen name="index" options={{ headerShown: false }} />
               <Stack.Screen
                  name="onboarding-second"
                  options={{ headerShown: false }}
               />
               <Stack.Screen
                  name="sign-in-options"
                  options={{ headerShown: false }}
               />
               <Stack.Screen
                  name="sign-in-email"
                  options={{ headerShown: false }}
               />
               <Stack.Screen name="sign-up" options={{ headerShown: false }} />
               <Stack.Screen name="(root)" options={{ headerShown: false }} />
            </Stack>
         </GestureHandlerRootView>
      </ReactQueryClientProvider>
   );
}
