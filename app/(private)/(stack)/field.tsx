import DarkBackdropSheet from "@/components/DarkBackdropSheet";
import FieldList from "@/components/FieldList";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
   BottomSheetBackdropProps,
   BottomSheetModal,
   BottomSheetModalProvider,
   BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LadangKu = () => {
   // ref
   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

   // variables
   const snapPoints = useMemo(() => ["60%", "60%"], []);

   // callbacks
   const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
   }, []);

   const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
   }, []);

   const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <DarkBackdropSheet {...props} />,
      []
   );

   const [selectedLanguage, setSelectedLanguage] = React.useState("Java");

   return (
      <BottomSheetModalProvider>
         <View className="px-[20] flex-1 py-[18] bg-white">
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

            <FieldList />

            <BottomSheetModal
               ref={bottomSheetModalRef}
               index={1}
               snapPoints={snapPoints}
               onChange={handleSheetChanges}
               backdropComponent={renderBackdrop}
            >
               <BottomSheetView style={styles.bottomSheet}>
                  <Text className="font-RedHatBold text-lg text-center mb-4">
                     Tambahkan Ladang
                  </Text>
                  <View className="">
                     <View className="mb-4">
                        <Text className="font-RedHatBold text-[#898989] mb-1.5">
                           Nama Ladang
                        </Text>
                        <TextInput
                           style={{ fontSize: 16 }}
                           className="px-3 py-2 border rounded-lg border-[#E5E5E5]"
                           placeholder="Ladangku"
                        />
                     </View>
                     <View className="mb-4">
                        <Text className="font-RedHatBold text-[#898989] mb-1.5">
                           Luas Ladang
                        </Text>

                        <TextInput
                           style={{ fontSize: 16 }}
                           className="px-3 py-2 border rounded-lg border-[#E5E5E5]"
                           placeholder="1000"
                        />
                        <Text className="text-xs text-[#898989]">
                           <Text className="text-red-500">*</Text>Dalam satuan
                           meter
                        </Text>
                     </View>
                     <View className="mb-4">
                        <Text className="font-RedHatBold text-[#898989] mb-1.5">
                           Lokasi
                        </Text>

                        <View className="flex-row  items-center gap-x-1">
                           <Ionicons
                              color={"green"}
                              name="location-outline"
                              size={24}
                           />
                           <Text style={{ fontSize: 16 }}>Pilih Lokasi</Text>
                        </View>
                     </View>
                     <TouchableOpacity className="py-3 px-3.5 rounded-xl bg-green-400">
                        <Text
                           style={{ fontSize: 16 }}
                           className="font-RedHatBold text-white text-center"
                        >
                           Buat
                        </Text>
                     </TouchableOpacity>
                  </View>
               </BottomSheetView>
            </BottomSheetModal>
         </View>
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
