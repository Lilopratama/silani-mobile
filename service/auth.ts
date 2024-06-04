import {
   GoogleSignin,
   statusCodes,
} from "@react-native-google-signin/google-signin";
import { useState } from "react";

export const useGoogleSignIn = async () => {
   const [error, setError] = useState<string | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   const signIn = async () => {
      try {
         setIsLoading(true);
         await GoogleSignin.hasPlayServices();
         const res = await GoogleSignin.signIn();

         console.log({ user: res });
      } catch (error: any) {
         switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
               setError("User Sign In is required");
               break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
               setError("Google Play Services are needed");
               break;
         }
         console.log("Error", error.code);
      } finally {
         setIsLoading(false);
      }
   };

   return {
      error,
      signIn,
      isLoading,
   };
};
