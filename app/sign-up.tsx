import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
   ImageBackground,
   Pressable,
   Text,
   TextInput,
   View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Link } from "expo-router";
import DateTimePicker, {
   DateTimePickerAndroid,
   DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const imageSource = require("@/assets/images/auth-image.jpg");

const welcome = "Hai 👋\nMari bergabung";

const SignUp = () => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const [date, setDate] = useState<Date | undefined>(new Date());

   const onChange = (
      event: DateTimePickerEvent,
      selectedDate: Date | undefined
   ) => {
      const currentDate = selectedDate;
      setDate(currentDate);
   };

   // const [openChooserDate, setOpenChooserDate] = React.useState()

   const showChooserDate = (currentMode: "date" | "time") => {
      DateTimePickerAndroid.open({
         value: date!,
         onChange,
         mode: currentMode,
         is24Hour: true,
      });
   };

   const showDatepicker = () => {
      showChooserDate("date");
   };

   return (
      <ImageBackground className="flex-1 px-[20] py-[40]" source={imageSource}>
         <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            className="h-full left-0 right-0 bottom-0 absolute rotate-180"
         />
         <View className="flex-1 justify-end gap-y-6">
            <View className="gap-y-1.5">
               <Text
                  style={{ fontSize: 32 }}
                  className="text-white font-RedHatMedium tracking-widest"
               >
                  {welcome}
               </Text>

               <Text
                  style={{ fontSize: 16 }}
                  className="text-white font-RedHatRegular max-w-[250]"
               >
                  Daftarkan Diri Anda Sekarang dan Rasakan Kemudahan Mengelola
                  Ladang
               </Text>
            </View>

            <View className="items-center">
               <Controller
                  control={control}
                  name="nama"
                  render={() => (
                     <View className="gap-y-1.5">
                        <Text className="text-white font-RedHatRegular">
                           Nama
                        </Text>
                        <TextInput
                           className="min-w-[320] h-[51] bg-white rounded-xl mb-4 px-4"
                           placeholder="John Doe"
                        />
                     </View>
                  )}
               />
               <Controller
                  control={control}
                  name="email"
                  render={() => (
                     <View className="gap-y-1.5">
                        <Text className="text-white font-RedHatRegular">
                           Email
                        </Text>
                        <TextInput
                           className="min-w-[320] h-[51] bg-white rounded-xl mb-4 px-4"
                           placeholder="johnDoe@example.com"
                        />
                     </View>
                  )}
               />
               <Controller
                  control={control}
                  name="dob"
                  render={() => (
                     <View className="gap-y-1.5">
                        <Text className="text-white font-RedHatRegular">
                           Tanggal Lahir
                        </Text>
                        {/* <TextInput
                           className="min-w-[320] h-[51] bg-white rounded-xl mb-4 px-4"
                           placeholder="13-07-2000"
                        /> */}

                        <Pressable
                           onPress={showDatepicker}
                           className="w-[320] h-[51] border rounded-xl px-4 bg-white mb-4 justify-center"
                        >
                           <Text>Choose date | {date?.toDateString()}</Text>
                        </Pressable>
                     </View>
                  )}
               />
               <Controller
                  control={control}
                  name="email"
                  render={() => (
                     <View className="gap-y-1.5 mb-6">
                        <Text className="text-white font-RedHatRegular">
                           Password
                        </Text>
                        <TextInput
                           secureTextEntry
                           className="min-w-[320] max-w-[350] h-[51] bg-white rounded-xl px-4"
                           placeholder="********"
                        />
                        <Link
                           href={"/"}
                           style={{ fontSize: 12 }}
                           className="text-primary font-RedHatRegular text-right"
                        >
                           Lupa password ?
                        </Link>
                     </View>
                  )}
               />
               <Pressable className="w-[320] h-[51] bg-dark/70 rounded-full items-center justify-center mb-1">
                  <Text className="font-RedHatRegular text-white">
                     Daftar Sekarang
                  </Text>
               </Pressable>
               <Text
                  style={{ fontSize: 12 }}
                  className="text-white font-RedHatRegular"
               >
                  Sudah terdaftar ?{" "}
                  <Link
                     style={{ fontSize: 12 }}
                     href={"/sign-in-options"}
                     className="text-primary font-RedHatRegular"
                  >
                     Masuk sekarang
                  </Link>
               </Text>
            </View>
         </View>
      </ImageBackground>
   );
};

export default SignUp;
