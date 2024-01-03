import { View, Text, StyleSheet } from "react-native";
import { Link } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useGetSessionClientSide } from "../../contexts/AuthContext";
import { LogouButton } from "../../components/logout-button";
import { Redirect } from "expo-router";

export default function HomePage() {
  const session = useGetSessionClientSide();

  if (!session) {
    return <Redirect href="/(tabs)/signin" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>BEM-VINDO</Text>
        <Text style={styles.subtitle}>Explore mais em nosso Dashboard.</Text>
        <Link style={styles.buttonGoDashboard} to="/dashboard">
          Ir para o Dashboard
        </Link>
        <LogouButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGoDashboard: {
    backgroundColor: "#242424",
    color: "#FFFFFF",
    padding: 8,
    borderRadius: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 8,
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

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
