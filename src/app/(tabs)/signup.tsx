import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from "react-native";

import { router } from "expo-router";
import { useGetSessionClientSide } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
// import RNPickerSelect from 'react-native-picker-select';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState("adm"); // Default role

  const session = useGetSessionClientSide();

  useEffect(() => {
    if (!session) {
      console.log("asdasd", session);
      router.replace("/signin");
    }
  }, [session]);

  const onFinish = async () => {
    try {
      setLoading(true);
      const { data } = await supabase.auth.signUp({ email, password });

      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.user?.id,
          email: email,
          accountType: accountType,
        }),
      });

      if (response.ok) {
        // Navigate to the sign-in screen or perform other actions as needed
      } else {
        // Handle registration error
      }
    } catch (error) {
      // Handle registration error
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
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

      {/* <RNPickerSelect
        value={accountType}
        onValueChange={(value) => setAccountType(value)}
        items={[
          { label: 'Administrador', value: 'adm' },
          { label: 'Trabalhador', value: 'worker' },
        ]}
        style={{ inputIOS: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, padding: 8 } }}
      /> */}

      <Button title="Submit" onPress={onFinish} disabled={loading} />

      <View style={styles.divider} />

      <Text style={styles.loginText}>
        If you already have an account,{" "}
        <TouchableOpacity onPress={() => console.log("Navigate to Signin")}>
          <Text style={{ color: "blue", fontWeight: "bold" }}>Login Now</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
