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

export default function RootLayout() {
   const [fontsLoaded, fontError] = useFonts({
      RedHatDisplay_400Regular,
      RedHatDisplay_500Medium,
      RedHatDisplay_700Bold,
   });

   useEffect(() => {
      const loadFonts = async () => {
         if (fontsLoaded) {
            await SplashScreen.hideAsync();
         }
      };
      loadFonts();
   }, [fontsLoaded, fontError]);

   if (!fontsLoaded || fontError) {
      return null;
   }

   return (
      <GestureHandlerRootView>
         <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: true }} />
            <Stack.Screen
               name="onboarding-second"
               options={{ headerShown: false }}
            />
         </Stack>
      </GestureHandlerRootView>
   );
}
