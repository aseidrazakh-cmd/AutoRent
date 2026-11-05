import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useApp } from "../context/AppContext";
import { COLORS } from "../components/theme";

export default function LoginScreen() {
  const { login } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        router.replace("/(tabs)/home");
      } else {
        setError(result.message);
      }
    } catch {
      setError("Кіру кезінде қате шықты!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logoArea}>
        <LinearGradient
          colors={["#3B82F6", "#2563EB"]}
          style={styles.logoIcon}
        >
          <Ionicons name="car-sport" size={45} color="#FFFFFF" />
        </LinearGradient>

        <Text style={styles.brand}>
          Auto<Text style={styles.blue}>Rent</Text>
        </Text>
      </View>

      <Text style={styles.title}>Welcome Back! 👋</Text>
      <Text style={styles.subtitle}>
        Sign in to continue your journey.
      </Text>

      <View style={styles.form}>
        <CustomInput
          label="Email Address"
          placeholder="Enter your email"
          icon="mail-outline"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          icon="lock-closed-outline"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.forgot}
          onPress={() => router.push("/forgot-password")}
        >
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <CustomButton
          title="Sign In"
          onPress={handleLogin}
          loading={loading}
          style={{ marginTop: 20 }}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.demo}>
        AutoRent • Premium Car Rental
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: {
    flexGrow: 1,
    paddingHorizontal: 25,
    paddingTop: 65,
    paddingBottom: 35,
    maxWidth: 540,
    width: "100%",
    alignSelf: "center",
  },
  logoArea: { alignItems: "center", marginBottom: 45 },
  logoIcon: {
    width: 90, height: 90, borderRadius: 27,
    justifyContent: "center", alignItems: "center"
  },
  brand: {
    color: COLORS.white, fontSize: 34,
    fontWeight: "900", marginTop: 18
  },
  blue: { color: COLORS.primary },
  title: {
    color: COLORS.white, fontSize: 30, fontWeight: "900"
  },
  subtitle: {
    color: COLORS.textSecondary, marginTop: 12, fontSize: 15
  },
  form: { marginTop: 35 },
  forgot: { alignSelf: "flex-end", marginTop: 2 },
  link: { color: COLORS.primary, fontWeight: "800" },
  error: { color: COLORS.danger, marginTop: 15 },
  footer: {
    flexDirection: "row", justifyContent: "center",
    marginTop: 35
  },
  footerText: { color: COLORS.textSecondary },
  demo: {
    color: COLORS.textSecondary,
    textAlign: "center", marginTop: 45, fontSize: 12
  },
});
