import MyButton from "@/components/MyButton";
import { Text, View } from "react-native";

export default function IndexScreen() {
   return (
      <View className="bg-secondary flex-1 justify-center items-center">
         <Text className="font-RedHatBold ">
            Edit app/index.tsx to edit this screen.
         </Text>
         <MyButton />
      </View>
   );
}
