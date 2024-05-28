import {
   BottomSheetBackdrop,
   BottomSheetModal,
   BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { RefObject, useCallback, useMemo } from "react";
import { Text } from "react-native";

type HargaPasarFilterModalProps = {
   ref: RefObject<BottomSheetModal> | null;
};

const HargaPasarFilterModal = (props: HargaPasarFilterModalProps) => {
   // variables
   const snapPoints = useMemo(() => ["10%", "50%", "75%"], []);

   // callbacks
   const handleSheetChanges = useCallback((index: number) => {
      console.log("handleSheetChanges", index);
   }, []);

   const renderBackdrop = useCallback(
      (props: any) => (
         <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={1}
            appearsOnIndex={2}
         />
      ),
      []
   );
   return (
      <BottomSheetModal
         ref={props.ref}
         index={1}
         snapPoints={snapPoints}
         backdropComponent={renderBackdrop}
         onChange={handleSheetChanges}
      >
         <BottomSheetView>
            <Text>Filter Pasar</Text>
         </BottomSheetView>
      </BottomSheetModal>
   );
};

export default HargaPasarFilterModal;
