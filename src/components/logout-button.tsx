import { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";

export function LogouButton() {
  const { logout } = useContext(AuthContext);
  return (
    <View>
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

