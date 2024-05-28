import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
   ImageBackground,
   Pressable,
   Text,
   TextInput,
   View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Link, useRouter } from "expo-router";
const imageSource = require("@/assets/images/auth-image.jpg");
const SignInOptions = () => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const router = useRouter();
   const handleSignIn = () => {
      router.push("/(root)");
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
                  Selamat datang kembali !
               </Text>

               <Text
                  style={{ fontSize: 16 }}
                  className="text-white font-RedHatRegular max-w-[250]"
               >
                  Masuk dengan email dan password
               </Text>
            </View>

            <View className="items-center">
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

               <Pressable
                  onPress={handleSignIn}
                  className="w-[320] h-[51] bg-dark/70 rounded-full items-center justify-center mb-1"
               >
                  <Text className="font-RedHatRegular text-white">Masuk</Text>
               </Pressable>
               <Text
                  style={{ fontSize: 12 }}
                  className="text-white font-RedHatRegular"
               >
                  Belum punya akun ?{" "}
                  <Link
                     style={{ fontSize: 12 }}
                     href={"/sign-up"}
                     className="text-primary font-RedHatRegular"
                  >
                     Daftar sekarang
                  </Link>
               </Text>
            </View>
         </View>
      </ImageBackground>
   );
};

export default SignInOptions;
