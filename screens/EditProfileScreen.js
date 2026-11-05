import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useApp } from "../context/AppContext";
import { COLORS } from "../components/theme";

export default function EditProfileScreen() {
  const { user, updateProfile } = useApp();

  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setMessage("");
    setSaving(true);

    try {
      const result = await updateProfile(name);

      if (result.success) {
        router.back();
      } else {
        setMessage(result.message);
      }
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Edit Profile ✏️</Text>
      <Text style={styles.subtitle}>Update your personal information</Text>

      <View style={styles.avatar}>
        <Ionicons name="person" size={55} color="#FFFFFF" />
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text style={styles.label}>Email Address</Text>
      <View style={styles.disabledInput}>
        <Text style={styles.disabledText}>{user?.email || "No email"}</Text>
        <Ionicons name="lock-closed-outline" size={18} color={COLORS.textSecondary} />
      </View>

      <Text style={styles.hint}>
        Email changes are unavailable in demo mode.
      </Text>

      {message ? <Text style={styles.error}>{message}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? "Saving..." : "Save Changes"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: COLORS.background,
    padding: 24, paddingTop: 55
  },
  title: {
    color: COLORS.white, fontSize: 30,
    fontWeight: "900", marginTop: 30
  },
  subtitle: { color: COLORS.textSecondary, marginTop: 10 },
  avatar: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: COLORS.primary, justifyContent: "center",
    alignItems: "center", alignSelf: "center", marginVertical: 40
  },
  label: {
    color: COLORS.white, fontWeight: "700", marginBottom: 12
  },
  input: {
    backgroundColor: COLORS.surface, borderRadius: 15,
    padding: 18, color: COLORS.white,
    fontSize: 16, marginBottom: 25
  },
  disabledInput: {
    backgroundColor: COLORS.surface, borderRadius: 15,
    padding: 18, flexDirection: "row",
    justifyContent: "space-between"
  },
  disabledText: { color: COLORS.textSecondary },
  hint: { color: COLORS.textSecondary, fontSize: 12, marginTop: 12 },
  error: { color: COLORS.danger, marginTop: 15 },
  button: {
    backgroundColor: COLORS.primary, padding: 19,
    borderRadius: 16, alignItems: "center", marginTop: 40
  },
  buttonText: {
    color: COLORS.white, fontWeight: "800", fontSize: 16
  },
});
