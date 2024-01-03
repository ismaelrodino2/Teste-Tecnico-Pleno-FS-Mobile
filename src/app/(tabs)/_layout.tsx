import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function () {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
          tabBarLabel: "Início",
        }}
      />

      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" color={color} size={size} />
          ),
          tabBarLabel: "Novo",
        }}
      />
      <Tabs.Screen
        name="signin"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="login" color={color} size={size} />
          ),
          tabBarLabel: "Login",
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="adduser" color={color} size={size} />
          ),
          tabBarLabel: "Cadastrar",
        }}
      />
    </Tabs>
  );
}
