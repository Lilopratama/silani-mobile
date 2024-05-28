import DarkBackdropSheet from "@/components/DarkBackdropSheet";
import MarketPriceList from "@/components/MarketPriceList";
import { Ionicons } from "@expo/vector-icons";
import {
   BottomSheetBackdropProps,
   BottomSheetModal,
   BottomSheetModalProvider,
   BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const MarketPrice = () => {
   const bottomSheetModalRef = useRef<BottomSheetModal>(null);
   const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
   }, []);

   // variables
   const snapPoints = useMemo(() => ["10%", "50%", "75%"], []);

   // callbacks
   const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
   }, []);

   const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => <DarkBackdropSheet {...props} />,
      []
   );

   return (
      <BottomSheetModalProvider>
         <View className="flex-1 bg-white px-[20]">
            <View className="flex-row items-center justify-between">
               <Text className="font-RedHatBold">Beras Premium</Text>
               <TouchableOpacity
                  className="flex-row items-center"
                  onPress={handlePresentModalPress}
               >
                  <Text className="mr-2">Filter</Text>
                  <Ionicons name="filter" />
               </TouchableOpacity>
            </View>

            <MarketPriceList />
            <BottomSheetModal
               ref={bottomSheetModalRef}
               index={1}
               snapPoints={snapPoints}
               backdropComponent={renderBackdrop}
               onChange={handleSheetChanges}
            >
               <BottomSheetView>
                  <Text className="font-RedHatBold text-lg text-center">
                     Filter Pasar
                  </Text>
               </BottomSheetView>
            </BottomSheetModal>
         </View>
      </BottomSheetModalProvider>
   );
};

export default MarketPrice;
