import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
   return (
      <Stack initialRouteName="(tabs)">
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="(stack)" options={{ headerShown: false }} />
      </Stack>
   );
};

export default RootLayout;