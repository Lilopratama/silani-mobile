import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";

const imageSource = require("@/assets/images/auth-image.jpg");
const SignInOptions = () => {
   const router = useRouter();
   return (
      <ImageBackground className="flex-1 px-[20] py-[40]" source={imageSource}>
         <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            className="h-full left-0 right-0 bottom-0 absolute rotate-180"
         />
         <View className="flex-1 justify-center">
            <Text
               style={{ fontSize: 48 }}
               className="text-white font-RedHatMedium tracking-widest"
            >
               Sil
               <FontAwesome5 name="tree" size={40} color="white" />
               ni
            </Text>

            <Text
               style={{ fontSize: 16 }}
               className="text-white font-RedHatRegular max-w-[250]"
            >
               Kelola Ladangmu, Tingkatkan Hasil Panenmu dengan Si Layanan
               Petani!
            </Text>
         </View>
         <View className="flex-1 items-center gap-y-5 justify-center">
            <Pressable
               onPress={() => router.push("/sign-in-email")}
               className="bg-primary w-[320] h-[51] rounded-full items-center justify-center"
            >
               <Text className="text-dark font-RedHatBold">
                  Masuk dengan email
               </Text>
            </Pressable>

            <View className="flex-row gap-x-2 items-center ">
               <View className="w-[24%] h-[2] bg-white" />
               <Text className="text-white font-RedHatRegular">
                  atau masuk dengan
               </Text>
               <View className="w-[24%] h-[2] bg-white" />
            </View>

            <Pressable className="bg-dark/70 flex-row backdrop-blur-sm w-[320] h-[51] gap-x-2 rounded-full items-center justify-center">
               <Ionicons
                  className="text-white"
                  name="logo-google"
                  size={20}
                  color={"white"}
               />
               <Text className="text-white font-RedHatMedium">Google</Text>
            </Pressable>

            <Pressable className="bg-dark/70 flex-row w-[320] h-[51] rounded-full items-center gap-x-2 justify-center">
               <Ionicons
                  className="text-white"
                  name="logo-facebook"
                  size={20}
                  color={"white"}
               />
               <Text className="text-white font-RedHatMedium">Facebook</Text>
            </Pressable>
         </View>
      </ImageBackground>
   );
};

export default SignInOptions;
