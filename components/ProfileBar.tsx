import { View, Text, Image } from "react-native";
import React from "react";
import DummyProfile from "@/constants/DummyProfile";
import { Ionicons } from "@expo/vector-icons";

const ProfileBar = () => {
   return (
      <View className="flex-row justify-between items-center mb-2">
         <View className="flex-row gap-x-2 items-center">
            <Image
               src={DummyProfile.avatarUrl}
               className="w-[45] h-[45] rounded-full"
            />
            <View>
               <Text className="font-RedHatRegular text-xs text-[#898989]">
                  Halo, Selamat Pagi👋
               </Text>
               <Text className="font-RedHatBold">{DummyProfile.name}</Text>
            </View>
         </View>

         <Ionicons
            name="notifications"
            size={24}
            style={{ transform: "rotate(45deg)" }}
         />
      </View>
   );
};

export default ProfileBar;
