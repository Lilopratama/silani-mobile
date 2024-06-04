import { useSignIn, useUser } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Redirect, router, useRouter } from "expo-router";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
   ImageBackground,
   Pressable,
   Text,
   TextInput,
   View,
} from "react-native";
const imageSource = require("@/assets/images/auth-image.jpg");
const SignInOptions = () => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const { isSignedIn, user } = useUser();

   const [isLoading, setIsLoading] = useState<boolean>(false);

   const { isLoaded, setActive, signIn } = useSignIn();
   const onSignInPress: SubmitHandler<any> = async (data) => {
      if (!isLoaded) {
         return;
      }
      setIsLoading(true);
      try {
         const completeSignIn = await signIn.create({
            identifier: data.email,
            password: data.password,
         });

         // This indicates the user is signed in
         await setActive({
            session: completeSignIn.createdSessionId,
         });

         return router.replace("/home");
      } catch (err: any) {
         alert(err.errors[0].message);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <ImageBackground className="flex-1 px-[20] py-[40]" source={imageSource}>
         <LinearGradient
            // Background Linear Gradient
            colors={["rgba(0,0,0,0.8)", "transparent"]}
            className="h-full left-0 right-0 bottom-0 absolute rotate-180"
         />
         <Spinner visible={isLoading} />
         {isSignedIn && isLoaded && <Text>{user.fullName}</Text>}
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
                  render={({ field: { onChange, onBlur, value } }) => (
                     <View className="gap-y-1.5">
                        <Text className="text-white font-RedHatRegular">
                           Email
                        </Text>
                        <TextInput
                           className="min-w-[320] h-[51] bg-white rounded-md mb-4 px-4"
                           placeholder="johnDoe@example.com"
                           onChangeText={onChange}
                           onBlur={onBlur}
                           value={value}
                        />
                     </View>
                  )}
               />
               <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <View className="gap-y-1.5 mb-6">
                        <Text className="text-white font-RedHatRegular">
                           Password
                        </Text>
                        <TextInput
                           secureTextEntry
                           className="min-w-[320] max-w-[350] h-[51] bg-white rounded-md px-4"
                           placeholder="********"
                           onChangeText={onChange}
                           onBlur={onBlur}
                           value={value}
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
                  onPress={handleSubmit(onSignInPress)}
                  className="w-[320] h-[51] bg-primary rounded-md items-center justify-center mb-1"
               >
                  <Text className="font-RedHatBold">Masuk</Text>
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
