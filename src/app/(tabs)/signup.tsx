import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";

import { Link, router } from "expo-router";
import { useGetSessionClientSide } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import { useToast } from "react-native-toast-notifications";
// import RNPickerSelect from 'react-native-picker-select';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();

  const onFinish = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.signUp({ email, password });

      await fetch(`${process.env.EXPO_PUBLIC_BASE_API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.user?.id,
          email: email,
          accountType: "worker",
        }),
      });
      setPassword("");
      setEmail("");
      setConfirmPassword("");
      toast.show("Conta criada!", { type: "success" });
      router.push("/(tabs)/signin");
    } catch (error) {
      toast.show("Erro!", { type: "danger " });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry
          style={styles.input}
        />

        <Button
          title={loading ? "Aguarde..." : "Cadastrar"}
          onPress={onFinish}
          disabled={loading}
        />

        <View style={styles.divider} />

        <Text style={styles.loginText}>
          If you already have an account,{" "}
          <Link href="/(tabs)/signin">
            <Text style={{ color: "blue", fontWeight: "bold" }}>Login Now</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    maxWidth: 600,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
});

export default SignUp;
