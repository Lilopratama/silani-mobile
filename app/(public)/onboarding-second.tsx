import OnBoardingText from "@/components/OnBoardingText";
import { SecondOnBoarding } from "@/constants/OnBoarding";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";

const imageSource = require("@/assets/images/second-bg.jpg");

export default function OnBoardingSecond() {
   const router = useRouter();
   return (
      <ImageBackground source={imageSource} className="flex-1 px-[20] py-[40]">
         <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            className="h-full left-0 right-0 bottom-0 absolute rotate-180"
         />

         <View className="flex-1 justify-center gap-y-2.5">
            <OnBoardingText
               textSize="xl"
               className="max-w-[220]"
               text={SecondOnBoarding[0]}
            />
            <OnBoardingText
               textSize="sm"
               className="max-w-[200] mb-2"
               text={SecondOnBoarding[1]}
            />
         </View>

         <View className="gap-y-4 flex-1 justify-end">
            <Pressable
               onPress={() => router.push("/sign-in-options")}
               className="bg-black/60 w-[216] h-[49] rounded-full flex-row items-center justify-center px-2.5 ml-auto mr-auto "
            >
               <View className="w-[40] h-[40] rounded-full bg-primary justify-center items-center absolute left-2">
                  <MaterialCommunityIcons
                     className=""
                     name="connection"
                     size={20}
                     color="black"
                  />
               </View>
               <Text
                  style={{ fontSize: 12 }}
                  className="text-white font-RedHatRegular ml-2"
               >
                  Bergabung Sekarang
               </Text>
            </Pressable>
         </View>
      </ImageBackground>
   );
}
