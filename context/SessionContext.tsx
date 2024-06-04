import axios, { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
   GoogleLoginDTO,
   GoogleLoginResponse,
   LoginDTO,
   LoginResponse,
   RegisterDTO,
   RegisterResponse,
   User,
} from "@/types/auth";
import {
   GoogleSignin,
   statusCodes,
} from "@react-native-google-signin/google-signin";

const BASE_API_AUTH_URL = process.env.EXPO_PUBLIC_API_URL;

export type SessionProps = {
   authState?: {
      token: string | null;
      authenticated: boolean | null;
   };
   onRegister: (dto: RegisterDTO) => Promise<any>;
   onLogin: (dto: LoginDTO) => Promise<any>;
   onLogout: () => Promise<any>;
   signInGoogle?: () => Promise<any>;
   isPending: boolean;
   error: string | null;
   user: User | null;
};

type ResponseError = {
   response: {
      data: any;
   };
};

// ? Key used to store JWT_TOKEN in storage
const TOKEN_KEY = "jwt_key";

const PROFILE_KEY = "silani_profile";

const SessionContext = createContext<SessionProps | null>(null);

export const useSession = () => {
   const context = useContext(SessionContext);

   if (!context) {
      throw new Error("useSession must be used within an SessionProvider");
   }

   return context;
};

export const SessionProvider = ({ children }: any) => {
   const [authState, setAuthState] = useState<SessionProps["authState"]>({
      token: null,
      authenticated: null,
   });

   const [error, setError] = useState<string | null>(null);

   const [user, setUser] = useState<User | null>(null);

   const [isPending, setIsPending] = useState<boolean>(false);

   // ? Load JWT_TOKEN from storage and append to Auth Header
   // TODO : Load user data from storage
   useEffect(() => {
      const loadToken = async () => {
         const token = await SecureStore.getItemAsync(TOKEN_KEY);
         if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAuthState({
               token,
               authenticated: true,
            });
         }

         const user = await SecureStore.getItemAsync(PROFILE_KEY);
         if (user) {
            setUser(JSON.parse(user));
         }
      };
      loadToken();
   }, []);

   const onLogin = async (dto: LoginDTO) => {
      try {
         setIsPending(true);
         setError(null);
         const URL = `${BASE_API_AUTH_URL}/api/auth/login`;

         const { data: signInRes } = await axios.post<LoginResponse>(URL, dto);
         console.log({ signInRes });

         setAuthState({
            authenticated: true,
            token: signInRes.data.token.accessToken,
         });

         // Todo set storage to store user
         const { token, ...data } = signInRes.data;

         setUser(data);
         await SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(data));

         axios.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${authState?.token}`;

         await SecureStore.setItemAsync(TOKEN_KEY, authState?.token || "");
      } catch (error: any) {
         console.log(error);
         setAuthState({ authenticated: false, token: null });
         setError("Error login");
      } finally {
         setIsPending(false);
      }
      return authState;
   };

   // TODO: Create new user
   // ? General register with email
   const onRegister = async (dto: RegisterDTO) => {
      try {
         setIsPending(true);
         setError(null);
         const URL = `${BASE_API_AUTH_URL}/api/auth/register`;
         console.log({ URL });
         const { data: registerRes } = await axios.post<RegisterResponse>(
            URL,
            dto
         );

         return registerRes;
      } catch (error: any) {
         console.log({ error: error.response.data.message });
         setError(error.response.data.message);
      } finally {
         setIsPending(false);
      }
      return null;
   };

   // TODO: Implement for google logout
   // ? General logout
   const onLogout = async () => {
      setIsPending(true);
      // Delete token from storage
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(PROFILE_KEY);

      // Update http headers
      axios.defaults.headers.common["Authorization"] = ``;

      // Reset auth state
      setAuthState({ token: null, authenticated: false });
      setIsPending(false);
   };

   // TODO: Implement for google login
   // TODO: Callback after success do something like onLogin above
   const signInGoogle = async () => {
      const URL = `${BASE_API_AUTH_URL}/google`;

      try {
         setIsPending(true);
         setError(null);
         await GoogleSignin.hasPlayServices();
         const res = await GoogleSignin.signIn();

         const dto: GoogleLoginDTO = {
            email: res.user.email,
            fullName: res.user.name || "",
            googleId: res.user.id,
            avatarUrl: res.user.photo || "",
         };

         const { data: signInRes } = await axios.post<GoogleLoginResponse>(
            URL,
            dto
         );

         setAuthState({
            authenticated: true,
            token: signInRes.data.token.accessToken,
         });

         const { token, ...data } = signInRes.data;
         setUser(data);
         await SecureStore.setItemAsync(PROFILE_KEY, JSON.stringify(data));

         axios.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${authState?.token}`;

         await SecureStore.setItemAsync(TOKEN_KEY, authState?.token || "");
      } catch (error: any) {
         switch (error.code) {
            case statusCodes.SIGN_IN_CANCELLED:
               setAuthState({ token: null, authenticated: false });
               break;
            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
               setAuthState({ token: null, authenticated: false });
               break;
            default:
               setAuthState({ token: null, authenticated: false });
               console.log({ error: error });
               break;
         }
      } finally {
         setIsPending(false);
      }

      return authState;
   };
   return (
      <SessionContext.Provider
         value={{
            authState,
            onLogin,
            onLogout,
            onRegister,
            signInGoogle,
            error,
            isPending,
            user,
         }}
      >
         {children}
      </SessionContext.Provider>
   );
};
