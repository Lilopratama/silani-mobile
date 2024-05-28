import BannerCompletesProfile from "@/components/BannerCompletesProfile";
import MenuList from "@/components/MenuList";
import NewsList from "@/components/NewsList";
import ProfileBar from "@/components/ProfileBar";
import SectionTitle from "@/components/SectionTitle";
import WeatherCard from "@/components/WeatherCard";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RootScreen = () => {
   return (
      <SafeAreaView className="flex-1 bg-white">
         <ScrollView className="px-[20] py-[18]">
            <ProfileBar />
            <SectionTitle title="Cuaca hari ini" />
            <WeatherCard />
            {/* <BannerCompletesProfile /> */}
            <SectionTitle title="Menu" />
            <MenuList />
            <View className="flex-row justify-between items-center">
               <SectionTitle title="Berita" />
               <Link
                  href={"/berita"}
                  className="text-xs font-RedHatRegular text-[#898989]"
               >
                  Lihat lebih
               </Link>
            </View>
            <NewsList />
            {/* <HomeNavigation /> */}

            {/* Blank space */}
            <View className="h-8" />
         </ScrollView>
      </SafeAreaView>
   );
};

export default RootScreen;
