import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="(stack)" options={{ headerShown: false }} />
         <Stack.Screen name="(get-started)" options={{ headerShown: false }} />
      </Stack>
   );
};

export default RootLayout;
