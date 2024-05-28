import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
   return (
      <Stack screenOptions={{ headerShadowVisible: false }}>
         <Stack.Screen
            name="chat"
            options={{
               title: "Tanya Lani",
            }}
         />
         <Stack.Screen
            name="field"
            options={{
               title: "Ladang Ku",
            }}
         />
         <Stack.Screen
            name="forecast"
            options={{
               title: "Ramalan Cuaca",
            }}
         />
         <Stack.Screen
            name="news"
            options={{
               title: "Berita",
            }}
         />
      </Stack>
   );
};

export default Layout;
