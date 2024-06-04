import { Stack } from "expo-router";
import React from "react";

const PublicLayout = () => {
   return (
      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="index" />
         <Stack.Screen name="onboarding-second" />
         <Stack.Screen name="sign-in-email" />
         <Stack.Screen name="sign-in-options" />
         <Stack.Screen name="sign-up" />
      </Stack>
   );
};

export default PublicLayout;
