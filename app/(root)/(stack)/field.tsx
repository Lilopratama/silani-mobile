import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import LadangList from "@/components/LadangList";
import BottomSheet, {
   BottomSheetModal,
   BottomSheetModalProvider,
   BottomSheetView,
} from "@gorhom/bottom-sheet";

const LadangKu = () => {
   // ref
   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

   // variables
   const snapPoints = useMemo(() => ["25%", "50%"], []);

   // callbacks
   const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
   }, []);

   const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
   }, []);

   return (
      <BottomSheetModalProvider>
         <ScrollView className="px-[20] flex-1 py-[18] bg-white">
            <View className="flex-row items-center justify-between">
               <TouchableOpacity
                  onPress={handlePresentModalPress}
                  className="bg-green-500 px-4 py-2 overflow-clip rounded-lg  items-center  flex-row"
               >
                  <Text className="font-RedHatBold mr-1.5 text-white">
                     Tambah
                  </Text>
                  <Ionicons name="create-outline" color={"white"} size={20} />
               </TouchableOpacity>
               <TouchableOpacity>
                  <MaterialCommunityIcons name="filter-menu" size={24} />
               </TouchableOpacity>
            </View>

            <LadangList />

            <BottomSheetModal
               ref={bottomSheetModalRef}
               index={1}
               snapPoints={snapPoints}
               onChange={handleSheetChanges}
            >
               <BottomSheetView style={styles.bottomSheet}>
                  <View
                     className="bg-secondary px-4 py-2 rounded-xl"
                     style={{
                        alignSelf: "flex-start",
                        flexShrink: 1,
                        elevation: 1,
                     }}
                  >
                     <Text className="font-RedHatBold">Tambahkan Ladang</Text>
                  </View>
               </BottomSheetView>
            </BottomSheetModal>
         </ScrollView>
      </BottomSheetModalProvider>
   );
};

export default LadangKu;

const styles = StyleSheet.create({
   bottomSheet: {
      flex: 1,
      paddingHorizontal: 20,
   },
});
