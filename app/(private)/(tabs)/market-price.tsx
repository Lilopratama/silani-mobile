import BottomSheetMarketPriceFilter from "@/components/BottomSheetMarketPriceFilter";
import MarketPriceActions from "@/components/MarketPriceActions";
import MarketPriceList from "@/components/MarketPriceList";
import ViewContainer from "@/components/container/ViewContainer";
import { BottomSheetCustomProvider } from "@/context/BottomSheetCustomContext";
import { getMarketPrice } from "@/service/market-price";
import { useMarketPriceParameterStore } from "@/store/market-price";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator } from "react-native";
import { useShallow } from "zustand/react/shallow";

const MarketPrice = () => {
   // TODO separate bottom sheet
   // TODO Refactor this code

   const stateMarketPrice = useMarketPriceParameterStore(
      useShallow((state) => state)
   );

   const [titleCommodity, setTitleCommodity] =
      React.useState<string>("Beras Premium");

   // TODO : Display data from API
   const { data: marketPriceData, isLoading } = useQuery({
      queryFn: () =>
         getMarketPrice({
            commodityId: stateMarketPrice.selectedCommodityID,
            date: stateMarketPrice.selectedDate,
            dataTypeId: stateMarketPrice.selectedDataTypeID,
         }),
      queryKey: ["market-price"],
   });

   return (
      <BottomSheetCustomProvider>
         <ViewContainer>
            <MarketPriceActions titleCommodity={titleCommodity} />

            {!marketPriceData || isLoading ? (
               <ActivityIndicator size="large" color="blue" />
            ) : (
               <MarketPriceList data={marketPriceData} />
            )}

            <BottomSheetMarketPriceFilter
               setTitleCommodity={setTitleCommodity}
            />
         </ViewContainer>
      </BottomSheetCustomProvider>
   );
};

export default MarketPrice;
