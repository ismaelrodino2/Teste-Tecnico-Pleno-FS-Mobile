"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useRootNavigationState } from "expo-router";

import axios from "axios";
import { User } from "../types/global-types";
import { supabase } from "../lib/supabase";

interface AuthContextProps {
  authenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>; // Updated type annotation
  logout: () => void;
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigationState = useRootNavigationState();

  console.log("user", user);

  useEffect(() => {
    const fetchData = async () => {
      // Check if the user is already logged in based on cookies - token must be verified anyway in api call

      const cookies = await AsyncStorage.getItem("supabase-auth");

      console.log("os cookies são...", cookies);

      if (!cookies) {
        // Se o token não estiver presente, o usuário não está autenticado
        return null;
      }

      try {
        const decriptedToken = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/token`,
          {
            headers: { Authorization: `Bearer ${cookies}` },
          }
        );

        console.log("decriptedToken", decriptedToken.data);
        console.log("decriptedToken", typeof decriptedToken.data);

        const finalToken =(decriptedToken.data);
        console.log(
          "decriptedToken123",
          typeof finalToken.encodedToken,
          finalToken.encodedToken
        );

        const isLoggedIn = !!finalToken.decodedToken.authenticated;
        setUser(finalToken.decodedToken.user);
        setAuthenticated(isLoggedIn);
      } catch (error) {
        // Lidar com erros, como token inválido, aqui
        console.error("Erro ao obter a sessão do cliente:", error);
      }
    };

    fetchData();
  }, []);

  const login = async (email: string, password: string) => {
    // Perform login logic, set authenticated to true
    console.log("teste", email, password);
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('data',data)

      if (data?.user) {
        const user = await axios.get(
          `https://teste-tecnico-pleno-fs-frontend-backend.vercel.app/api/user`,
          {
            params: {
              email: data.user.email,
            },
          }
        );
        console.log("user2", user);

        const parsedUser: User = user.data.user;

        const info = {
          authenticated: true,
          user: parsedUser,
        };

        setAuthenticated(true);

        setUser(info.user);
        console.log("info.user", info.user);

        const token = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/token`,
          {
            info: info,
          }
        );

        console.log("Token21", token.data);
        console.log("Token22", typeof token.data);
        console.log("Token23", token.data.encodedToken);

        await AsyncStorage.setItem(
          "supabase-auth",
          token.data.encodedToken
        );
        if (!navigationState?.key) return false;
        router.replace("/");
        return true; // Return true to indicate successful login
      } else {
        throw new Error("Error authenticating");
      }
    } catch (err) {
      console.log(err);
      throw new Error("error");
    }
  };

  const logout = async () => {
    // Perform logout logic, set authenticated to false
    await supabase.auth.signOut();
    setAuthenticated(false);
    setUser(null);
    await AsyncStorage.removeItem("supabase-auth");
    router.push("/(tabs)/signin");
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useGetSessionClientSide() {
  const { user } = useContext(AuthContext);
  return user;
}
