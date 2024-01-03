import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "expo-router";
import { useToast } from "react-native-toast-notifications";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const { login } = useContext(AuthContext);

  const onFinish = async() => {
    console.log({ email, password });
    try {
      await login(email, password);
      toast.show("Logado!", { type: "success" });
    } catch (error) {
      console.log(error);
      toast.show("Erro!", { type: " " });
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

        <Button
          title={loading ? "Aguarde..." : "Cadastrar"}
          onPress={onFinish}
          disabled={loading}
        />
        <View style={styles.divider} />
        <Text style={styles.signUpText}>
          If you don't have an account,
          <Link href="/(tabs)/signup">
            <Text style={{ color: "blue", fontWeight: "bold" }}>Sign Up</Text>
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
  signUpText: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
});

export default SignIn;
