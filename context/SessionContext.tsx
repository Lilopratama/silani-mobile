import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export type SessionProps = {
   authState?: {
      token: string | null;
      authenticated: boolean | null;
   };
   onRegister?: (email: string, password: string) => Promise<any>;
   onLogin?: (email: string, password: string) => Promise<any>;
   onLogout?: () => Promise<any>;
};

const TOKEN_KEY = "jwt_key";
const SessionContext = createContext<SessionProps>({});

export const useSession = () => {
   const context = useContext(SessionContext);
   if (process.env.NODE_ENV !== "production") {
      if (!context) {
         throw new Error("useSession must be used within an SessionProvider");
      }
   }
   return context;
};

export const SessionProvider = ({ children }: any) => {
   const [authState, setAuthState] = useState<SessionProps["authState"]>({
      token: null,
      authenticated: null,
   });

   // Load token from storage
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
      };
      loadToken();
   }, []);

   // Save token to storage
   const onLogin = async (email: string, password: string) => {
      setAuthState({
         authenticated: true,
         token: "token",
      });

      axios.defaults.headers.common[
         "Authorization"
      ] = `Bearer ${authState?.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, authState?.token || "");

      return authState;
   };

   // Save token to storage
   const onRegister = async (email: string, password: string) => {};

   // Delete token from storage
   const onLogout = async () => {
      // Delete token from storage
      await SecureStore.deleteItemAsync(TOKEN_KEY);

      // Update http headers
      axios.defaults.headers.common["Authorization"] = ``;

      // Reset auth state
      setAuthState({ token: null, authenticated: false });
   };

   return (
      <SessionContext.Provider
         value={{ authState, onLogin, onLogout, onRegister }}
      >
         {children}
      </SessionContext.Provider>
   );
};
