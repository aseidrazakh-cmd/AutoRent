import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useApp } from "../context/AppContext";
import { COLORS } from "../components/theme";

export default function ForgotPasswordScreen() {
  const { resetPassword } = useApp();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    setMessage("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setMessage("Құпиясөздер сәйкес келмейді!");
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(email, newPassword);
      setSuccess(result.success);
      setMessage(
        result.success
          ? "Құпиясөз өзгертілді! Енді Login арқылы кір."
          : result.message
      );
    } catch {
      setMessage("Қате шықты!");
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

      <View style={styles.iconBox}>
        <Ionicons
          name="lock-open-outline"
          size={55}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>
        Enter your account email and choose a new password.
      </Text>

      <Text style={styles.notice}>
        Demo mode: No verification email is sent.
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
          label="New Password"
          placeholder="Enter new password"
          icon="lock-closed-outline"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <CustomInput
          label="Confirm New Password"
          placeholder="Repeat new password"
          icon="shield-checkmark-outline"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {message ? (
          <Text
            style={[
              styles.message,
              { color: success ? COLORS.success : COLORS.danger },
            ]}
          >
            {message}
          </Text>
        ) : null}

        <CustomButton
          title="Reset Password"
          onPress={handleReset}
          loading={loading}
          style={{ marginTop: 15 }}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.link}>Back to Sign In</Text>
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
  iconBox: {
    backgroundColor: COLORS.surface,
    width: 105, height: 105, borderRadius: 30,
    alignItems: "center", justifyContent: "center",
    marginTop: 55
  },
  title: {
    color: COLORS.white, fontSize: 30,
    fontWeight: "900", marginTop: 30
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15, lineHeight: 24, marginTop: 12
  },
  notice: {
    color: COLORS.warning, marginTop: 18, fontSize: 13
  },
  form: { marginTop: 35 },
  message: { marginBottom: 15, fontWeight: "700" },
  backButton: { alignItems: "center", marginTop: 25 },
  link: { color: COLORS.primary, fontWeight: "800" },
});
