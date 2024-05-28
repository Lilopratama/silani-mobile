import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { cn } from "@/libs/utils";
import { Colors } from "@/constants/Colors";

const HomeNavigation = () => {
   return (
      <View className="absolute left-[20] px-5 flex-row right-[20] bottom-[20] h-[55] rounded-full  bg-black/100 items-center justify-between">
         {HOME_ITEM.map((item, index) => (
            <MenuItem key={index} {...item} />
         ))}
      </View>
   );
};

export default HomeNavigation;

const HOME_ITEM = [
   {
      name: "index",
      title: "Home",
      headerShown: false,
      iconSize: 24,
      iconNames: ["home", "home-outline"] as const,
      // iconColors: [""]
   },
   {
      name: "tanya-lani",
      title: "Tanya Lani",
      iconSize: 24,
      headerShown: true,
      iconNames: ["chatbox-ellipses", "chatbox-ellipses-outline"] as const,

      // iconColors: ["#fff", "#fff"]
   },
   {
      name: "harga-pasar",
      title: "Harga Pasar",
      iconSize: 24,
      headerShown: true,
      iconNames: ["pricetag", "pricetag-outline"] as const,
      // iconColors: ["#fff", "#fff"]
   },
   {
      name: "pengaturan",
      title: "Pengaturan",
      iconSize: 24,
      headerShown: true,
      iconNames: ["settings", "settings-outline"] as const,
      // iconColors: ["#fff", "#fff"]
   },
];

const MenuItem = (props: (typeof HOME_ITEM)[number]) => {
   const router = useRouter();
   const pathname = usePathname();
   return (
      <Pressable
         className="items-center"
         onPress={() => router.push(props.name)}
      >
         <Ionicons
            name={props.iconNames[0]}
            color={pathname.includes(props.name) ? Colors.primary : "white"}
            size={props.iconSize}
         />
         <Text
            className={cn("text-xs font-RedHatBold text-white", {
               "text-primary": pathname.includes(props.name),
            })}
         >
            {props.title}
         </Text>
      </Pressable>
   );
};
