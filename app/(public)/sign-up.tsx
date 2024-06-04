import { useSignUp } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Spinner from "react-native-loading-spinner-overlay";
import {
   Alert,
   Button,
   ImageBackground,
   Pressable,
   StyleSheet,
   Text,
   TextInput,
   View,
} from "react-native";
import Modal from "react-native-modal";

const imageSource = require("@/assets/images/auth-image.jpg");

const welcome = "Hai 👋\nMari bergabung";

const SignUp = () => {
   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [pendingVerification, setPendingVerification] =
      useState<boolean>(false);

   const [codeVerification, setCodeVerification] = useState<string>("");

   const { isLoaded, setActive, signUp } = useSignUp();

   const onSignUpPress: SubmitHandler<any> = async (data) => {
      if (!isLoaded) {
         return;
      }
      setIsLoading(true);

      try {
         // Create the user on Clerk
         await signUp.create({
            emailAddress: data.email,
            password: data.password,
            firstName: data.fullName,
         });

         // Send verification Email
         await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
         });

         // change the UI to verify the email address
         setPendingVerification(true);
      } catch (err: any) {
         console.error(JSON.stringify(err, null, 2));
         alert(err.errors[0].message);
      } finally {
         setIsLoading(false);
      }
   };

   const onPressVerify = async () => {
      if (!isLoaded) {
         return;
      }
      setIsLoading(true);

      try {
         const completeSignUp = await signUp.attemptEmailAddressVerification({
            code: codeVerification,
         });

         await setActive({ session: completeSignUp.createdSessionId });
      } catch (err: any) {
         console.error(JSON.stringify(err, null, 2));
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

         <Modal
            isVisible={pendingVerification}
            // onBackdropPress={() => setModalVisible(false)}
            style={styles.view}
            hasBackdrop={false}
         >
            <View className="bg-white rounded-t-xl flex-1 px-[20] max-h-[30%]">
               <Text className="font-RedHatBold text-lg text-center mb-4">
                  Verification Email!
               </Text>
               <TextInput
                  onChangeText={setCodeVerification}
                  placeholder="Code verification..."
                  value={codeVerification}
               />
               {/* <Button title="Hide modal" onPress={toggleModal} /> */}
               <Pressable
                  onPress={onPressVerify}
                  className="px-4 py-2 rounded-md border"
               >
                  Verify
               </Pressable>
            </View>
         </Modal>
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
                  name="fullName"
                  render={({ field: { onChange, onBlur, value } }) => (
                     <View className="gap-y-1.5">
                        <Text className="text-white font-RedHatRegular">
                           Nama
                        </Text>
                        <TextInput
                           className="min-w-[320] h-[51] bg-white rounded-md mb-4 px-4"
                           placeholder="John Doe"
                           onChangeText={onChange}
                           value={value}
                           onBlur={onBlur}
                        />
                     </View>
                  )}
               />
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
                           value={value}
                           onBlur={onBlur}
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
                           value={value}
                           onBlur={onBlur}
                        />
                     </View>
                  )}
               />
               <Pressable
                  onPress={handleSubmit(onSignUpPress)}
                  className="w-[320] h-[51] bg-primary rounded-md items-center justify-center mb-1"
               >
                  <Text className="font-RedHatRegular text-black">
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

const styles = StyleSheet.create({
   view: {
      justifyContent: "flex-end",
      margin: 0,
   },
});
