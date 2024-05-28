import { cn } from "@/libs/utils";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

const MarketPriceList = () => {
   return (
      <View className="">
         <FlatList
            data={MarketPriceDummy}
            contentContainerStyle={{
               paddingBottom: 20,
               paddingTop: 10,
               gap: 10,
            }}
            renderItem={({ index, item }) => (
               <MarketPriceItem key={index} {...item} />
            )}
         />
      </View>
   );
};

export default MarketPriceList;

type MarketPriceItemProps = {
   province: string;
   disparity: number;
   price: number;
};

export const MarketPriceItem = (props: MarketPriceItemProps) => {
   return (
      <View className="flex-row h-[80] px-[2] py-[3] border-b border-[#E5E5E5] overflow-hidden">
         <View className="flex-row items-center flex-1">
            <Image src={dummyImage} className="w-[60] h-[60] rounded-full" />

            <View>
               <Text className="ml-3 font-RedHatBold">{props.province}</Text>
               <Text className="ml-3 font-RedHatMedium">Rp.{props.price}</Text>
            </View>
         </View>

         <View className="justify-between items-end">
            <Ionicons name="information-circle-outline" size={20} />
            <Text
               className={cn(
                  "text-white text-xs px-2 py-1 rounded-lg bg-red-400 font-RedHatMedium",
                  {
                     "bg-yellow-400":
                        props.disparity > 0 && props.disparity <= 6,
                  },
                  { "bg-green-400": props.disparity > 6 }
               )}
            >
               {props.disparity}
            </Text>
         </View>
      </View>
   );
};

const dummyImage =
   "https://images.unsplash.com/photo-1591017683260-655b616bfb17?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const MarketPriceDummy = [
   {
      province: "Aceh",
      disparity: 4.5, // less than 5
      price: 14480,
   },
   {
      province: "Bali",
      disparity: 5.8, // valid range
      price: 15820,
   },
   {
      province: "Banten",
      disparity: 7.1, // valid range
      price: 15100,
   },
   {
      province: "Bengkulu",
      disparity: 3.2, // less than 5
      price: 14750,
   },
   {
      province: "Central Java",
      disparity: -2.5, // negative
      price: 14200,
   },
   {
      province: "East Java",
      disparity: 6.0, // valid range
      price: 14500,
   },
   {
      province: "Jakarta",
      disparity: -3.1, // negative
      price: 15000,
   },
   {
      province: "West Java",
      disparity: 6.2, // valid range
      price: 14300,
   },
   {
      province: "Lampung",
      disparity: 6.75, // valid range
      price: 14900,
   },
   {
      province: "North Sumatra",
      disparity: -1.9, // negative
      price: 14850,
   },
   {
      province: "South Sulawesi",
      disparity: 2.4, // less than 5
      price: 14600,
   },
   {
      province: "West Kalimantan",
      disparity: 1.5, // less than 5
      price: 14450,
   },
   {
      province: "Yogyakarta",
      disparity: 5.85, // valid range
      price: 14100,
   },
];
