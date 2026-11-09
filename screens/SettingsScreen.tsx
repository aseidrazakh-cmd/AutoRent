import React, { useEffect, useState } from "react";
import {
  View, Text, ScrollView, Switch,
  TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import { COLORS } from "../components/theme";

const SETTINGS_KEY = "@autorent_settings";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [promotions, setPromotions] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(SETTINGS_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setNotifications(data.notifications ?? true);
          setPromotions(data.promotions ?? false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    load();
  }, []);

  async function save(nextNotifications: boolean, nextPromotions: boolean) {
    setNotifications(nextNotifications);
    setPromotions(nextPromotions);

    try {
      await AsyncStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify({
          notifications: nextNotifications,
          promotions: nextPromotions,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Settings ⚙️</Text>
      <Text style={styles.subtitle}>Manage your preferences</Text>

      <Text style={styles.section}>Notifications</Text>

      <View style={styles.item}>
        <View style={styles.iconBox}>
          <Ionicons name="notifications-outline" size={23} color={COLORS.primary} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>Push Notifications</Text>
          <Text style={styles.itemSubtitle}>Receive booking updates</Text>
        </View>
        <Switch
          value={notifications}
          onValueChange={(value) => save(value, promotions)}
          trackColor={{ false: "#334155", true: COLORS.primary }}
        />
      </View>

      <View style={styles.item}>
        <View style={styles.iconBox}>
          <Ionicons name="pricetag-outline" size={23} color={COLORS.primary} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>Promotional Offers</Text>
          <Text style={styles.itemSubtitle}>Special deals and discounts</Text>
        </View>
        <Switch
          value={promotions}
          onValueChange={(value) => save(notifications, value)}
          trackColor={{ false: "#334155", true: COLORS.primary }}
        />
      </View>

      <Text style={styles.section}>About</Text>

      <View style={styles.item}>
        <View style={styles.iconBox}>
          <Ionicons name="information-circle-outline" size={23} color={COLORS.primary} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>App Version</Text>
          <Text style={styles.itemSubtitle}>1.0.0</Text>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.iconBox}>
          <Ionicons name="school-outline" size={23} color={COLORS.primary} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.itemTitle}>AutoRent</Text>
          <Text style={styles.itemSubtitle}>AppStorm Student Project</Text>
        </View>
      </View>

      <Text style={styles.footer}>Made with 💙 using React Native & Expo</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 22, paddingTop: 55, paddingBottom: 40 },
  title: { color: COLORS.white, fontSize: 30, fontWeight: "900", marginTop: 30 },
  subtitle: { color: COLORS.textSecondary, marginTop: 10 },
  section: {
    color: COLORS.white, fontSize: 20,
    fontWeight: "800", marginTop: 38, marginBottom: 18
  },
  item: {
    backgroundColor: COLORS.surface, borderRadius: 17,
    padding: 16, flexDirection: "row",
    alignItems: "center", marginBottom: 13
  },
  iconBox: {
    width: 45, height: 45, borderRadius: 13,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: "center", alignItems: "center"
  },
  itemText: { flex: 1, marginLeft: 14 },
  itemTitle: { color: COLORS.white, fontSize: 15, fontWeight: "800" },
  itemSubtitle: { color: COLORS.textSecondary, fontSize: 12, marginTop: 5 },
  footer: {
    color: COLORS.textSecondary,
    textAlign: "center", marginTop: 40, fontSize: 12
  },
});

