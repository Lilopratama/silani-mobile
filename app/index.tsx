import OnBoardingText from "@/components/OnBoardingText";
import { OnBoarding } from "@/constants/OnBoarding";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ImageBackground, Pressable, Text, View } from "react-native";

// Load image source
const imageSource = require("@/assets/images/WelcomeBG.jpg");

export default function IndexScreen() {
   // Router for navigation
   const router = useRouter();
   return (
      // Image Background
      <ImageBackground
         source={imageSource}
         className="flex-1 justify-end px-[20] py-[40]"
      >
         <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            className="h-full left-0 right-0 bottom-0 absolute rotate-180"
         />
         <View className="gap-y-4">
            <OnBoardingText
               textSize="xl"
               className="max-w-[180]"
               text={OnBoarding[0]}
            />
            <View className="flex-row gap-x-2">
               <MaterialCommunityIcons
                  name="hand-heart"
                  size={20}
                  color="white"
               />
               <OnBoardingText
                  textSize="sm"
                  className="max-w-[180]"
                  text={OnBoarding[1]}
               />
            </View>
            <OnBoardingText
               textSize="md"
               className="max-w-[180] mb-2"
               text={OnBoarding[2]}
            />

            <Pressable
               onPress={() => router.push("/onboarding-second")}
               className="bg-primary  w-[172] h-[49] rounded-full flex-row items-center justify-start px-4 ml-auto"
            >
               <Text className="font-RedHatRegular">Selanjutnya</Text>
               <View className="w-[40] h-[40] rounded-full bg-dark justify-center items-center absolute right-2">
                  <AntDesign
                     className=""
                     name="arrowright"
                     size={20}
                     color="white"
                  />
               </View>
            </Pressable>
         </View>
      </ImageBackground>
   );
}
