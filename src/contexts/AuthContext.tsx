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
  logout: () => Promise<void>;
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

  useEffect(() => {
    const fetchData = async () => {
      const cookies = await AsyncStorage.getItem("supabase-auth");

      if (!cookies) {
        return null;
      }

      try {
        const decriptedToken = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/token`,
          {
            headers: { Authorization: `Bearer ${cookies}` },
          }
        );

        const finalToken = decriptedToken.data;

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
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data?.user) {
        const user = await axios.get(
          `https://teste-tecnico-pleno-fs-frontend-backend.vercel.app/api/user`,
          {
            params: {
              email: data.user.email,
            },
          }
        );

        const parsedUser: User = user.data.user;

        const info = {
          authenticated: true,
          user: parsedUser,
        };

        setAuthenticated(true);

        setUser(info.user);

        const token = await axios.post(
          `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/token`,
          {
            info: info,
          }
        );

        await AsyncStorage.setItem("supabase-auth", token.data.encodedToken);
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
