import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
type IconName = React.ComponentProps<typeof Ionicons>["name"];
import { router } from "expo-router";

import { COLORS } from "../components/theme";

const methods = [
  { id: "card", name: "Bank Card", icon: "card-outline", description: "Visa / Mastercard" },
  { id: "kaspi", name: "Kaspi.kz", icon: "wallet-outline", description: "Demo Kaspi payment" },
  { id: "cash", name: "Cash", icon: "cash-outline", description: "Pay at pickup (demo)" },
];

export default function PaymentScreen() {
  const [selected, setSelected] = useState("card");
  const [saved, setSaved] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Payment Methods 💳</Text>
      <Text style={styles.subtitle}>Choose your preferred payment method</Text>

      <View style={styles.notice}>
        <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
        <Text style={styles.noticeText}>
          Demo mode only. No real payments or card transactions are processed.
        </Text>
      </View>

      <Text style={styles.section}>Available Methods</Text>

      {methods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={[styles.method, selected === method.id && styles.activeMethod]}
          onPress={() => {
            setSelected(method.id);
            setSaved(false);
          }}
        >
          <View style={styles.iconBox}>
            <Ionicons name={method.icon as IconName} size={27} color={COLORS.primary} />
          </View>

          <View style={styles.methodInfo}>
            <Text style={styles.methodName}>{method.name}</Text>
            <Text style={styles.methodDescription}>{method.description}</Text>
          </View>

          <Ionicons
            name={selected === method.id ? "radio-button-on" : "radio-button-off"}
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => setSaved(true)}>
        <Text style={styles.buttonText}>Save Preference</Text>
      </TouchableOpacity>

      {saved && (
        <Text style={styles.success}>
          ✓ {methods.find((method) => method.id === selected)?.name} selected for this session!
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 22, paddingTop: 55, paddingBottom: 45 },
  title: { color: COLORS.white, fontSize: 30, fontWeight: "900", marginTop: 30 },
  subtitle: { color: COLORS.textSecondary, marginTop: 10 },
  notice: {
    flexDirection: "row", backgroundColor: COLORS.surface,
    borderRadius: 18, padding: 18, marginTop: 30, gap: 12
  },
  noticeText: { color: COLORS.textSecondary, flex: 1, lineHeight: 22 },
  section: {
    color: COLORS.white, fontSize: 21,
    fontWeight: "800", marginTop: 35, marginBottom: 18
  },
  method: {
    backgroundColor: COLORS.surface, borderRadius: 18,
    padding: 17, flexDirection: "row", alignItems: "center",
    marginBottom: 15, borderWidth: 1, borderColor: COLORS.border
  },
  activeMethod: { borderColor: COLORS.primary },
  iconBox: {
    width: 50, height: 50, borderRadius: 14,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: "center", alignItems: "center"
  },
  methodInfo: { flex: 1, marginLeft: 15 },
  methodName: { color: COLORS.white, fontSize: 16, fontWeight: "800" },
  methodDescription: { color: COLORS.textSecondary, marginTop: 6, fontSize: 12 },
  button: {
    backgroundColor: COLORS.primary, padding: 19,
    borderRadius: 17, alignItems: "center", marginTop: 30
  },
  buttonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
  success: { color: COLORS.success, textAlign: "center", marginTop: 20 },
});

