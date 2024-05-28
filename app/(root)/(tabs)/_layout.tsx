import { Fonts } from "@/constants/Fonts";
import { cn } from "@/libs/utils";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
const Layout = () => {
   return (
      <Tabs
         screenOptions={({ route }) => ({
            headerTitleStyle: {
               fontFamily: Fonts.fontFamily.RedHatDisplay_700Bold,
            },
            tabBarStyle: {
               height: 60,
               position: "absolute",
               bottom: 20,
               left: 20,
               right: 20,
               borderRadius: 12,
            },

            tabBarIcon: ({ focused, color, size }) => {
               switch (route.name) {
                  case "index":
                     return (
                        <View
                           className={cn(
                              "flex-row items-center py-1.5 px-3 rounded-xl",
                              { "bg-yellow-100": focused }
                           )}
                        >
                           <Ionicons
                              name={focused ? "home-outline" : "home-outline"}
                              size={24}
                              color={focused ? "black" : "#898989"}
                              className=""
                           />
                           {focused && (
                              <Text className="pl-2 font-RedHatMedium">
                                 Home
                              </Text>
                           )}
                        </View>
                     );

                  case "market-price":
                     return (
                        <View
                           className={cn(
                              "flex-row items-center py-1.5 px-3 rounded-xl",
                              { "bg-yellow-100": focused }
                           )}
                        >
                           <Ionicons
                              name={
                                 focused
                                    ? "pricetag-outline"
                                    : "pricetag-outline"
                              }
                              size={24}
                              color={focused ? "black" : "#898989"}
                              className=""
                           />
                           {focused && (
                              <Text className="pl-2 font-RedHatMedium">
                                 Harga Pasar
                              </Text>
                           )}
                        </View>
                     );

                  default:
                     return (
                        <View
                           className={cn(
                              "flex-row items-center py-1.5 px-3 rounded-xl",
                              { "bg-yellow-100": focused }
                           )}
                        >
                           <Ionicons
                              name={
                                 focused ? "person-outline" : "person-outline"
                              }
                              size={24}
                              color={focused ? "black" : "#898989"}
                              className=""
                           />
                           {focused && (
                              <Text className="pl-2 font-RedHatMedium">
                                 Profile
                              </Text>
                           )}
                        </View>
                     );
               }
            },
            headerShadowVisible: false,
            tabBarShowLabel: false,
         })}
      >
         <Tabs.Screen
            name="index"
            options={{
               headerShown: false,
               headerTitle: "Beranda",
               // tabBarIcon: () => <Ionicons name="home-outline" size={28} />,
               // title: "Beranda",
            }}
         />

         <Tabs.Screen
            name="market-price"
            options={{
               headerTitle: "Harga Pasar",
               // tabBarIcon: () => <Ionicons name="pricetag-outline" size={28} />,
               // title: "Harga Pasar",
            }}
         />

         <Tabs.Screen
            name="profile"
            options={{
               headerTitle: "Profile",
               // tabBarIcon: () => <Ionicons name="person-outline" size={28} />,
               // title: "Profile",
            }}
         />
      </Tabs>
   );
};

export default Layout;
