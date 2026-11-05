import React, { useState } from "react";
import {
  Text, ScrollView, TouchableOpacity,
  View, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useApp } from "../context/AppContext";
import { COLORS } from "../components/theme";

export default function RegisterScreen() {
  const { register } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError("");

    if (password !== confirmPassword) {
      setError("Құпиясөздер сәйкес келмейді!");
      return;
    }

    setLoading(true);

    try {
      const result = await register(name, email, password);

      if (result.success) {
        router.replace("/(tabs)/home");
      } else {
        setError(result.message);
      }
    } catch {
      setError("Тіркелу кезінде қате шықты!");
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
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Create Account 🚗</Text>
      <Text style={styles.subtitle}>
        Join AutoRent and start your journey.
      </Text>

      <View style={styles.form}>
        <CustomInput
          label="Full Name"
          placeholder="Enter your full name"
          icon="person-outline"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />

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
          placeholder="Create password"
          icon="lock-closed-outline"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <CustomInput
          label="Confirm Password"
          placeholder="Repeat password"
          icon="shield-checkmark-outline"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <CustomButton
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          style={{ marginTop: 15 }}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: {
    paddingHorizontal: 25,
    paddingTop: 55,
    paddingBottom: 45,
    maxWidth: 540,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    color: COLORS.white, fontSize: 30,
    fontWeight: "900", marginTop: 35
  },
  subtitle: {
    color: COLORS.textSecondary, marginTop: 12
  },
  form: { marginTop: 35 },
  error: { color: COLORS.danger, marginBottom: 15 },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30
  },
  footerText: { color: COLORS.textSecondary },
  link: { color: COLORS.primary, fontWeight: "800" },
});
