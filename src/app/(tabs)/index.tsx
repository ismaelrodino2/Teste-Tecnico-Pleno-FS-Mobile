import { View, Text, StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useGetSessionClientSide } from "../../contexts/AuthContext";

export default function HomePage() {
  // você pode adaptar a lógica do useGetSessionServerSide para o ambiente React Native

  const session = useGetSessionClientSide();

  // useEffect(() => {
  //   if (!session) {
  //     console.log("asdasd", session);
  //     router.push("/");
  //   }
  // }, [session]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>BEM-VINDO</Text>
        <Text style={styles.subtitle}>Explore mais em nosso Dashboard.</Text>
        <Link to="/dashboard">Ir para o Dashboard</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue", // altere a cor conforme necessário
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
