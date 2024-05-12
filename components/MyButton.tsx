import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text } from "react-native";

const MyButton = () => {
   return (
      <Pressable className="bg-primary w-[150] h-[50] justify-center items-center flex-row rounded-full">
         <Ionicons name="alarm" size={20} />
         <Text>My Button</Text>
      </Pressable>
   );
};

export default MyButton;
