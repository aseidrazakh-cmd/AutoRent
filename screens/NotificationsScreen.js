import React from "react";
import {
  View, Text, ScrollView,
  TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useBookings } from "../context/BookingContext";
import { useApp } from "../context/AppContext";
import { COLORS } from "../components/theme";

export default function NotificationsScreen() {
  const { bookings } = useBookings();
  const { user } = useApp();

  const notifications = bookings
    .filter((item) => item.userEmail === user?.email)
    .map((booking) => ({
      id: booking.id,
      title:
        booking.status === "Confirmed"
          ? "Booking Confirmed!"
          : "Booking Cancelled",
      message:
        booking.status === "Confirmed"
          ? `Your ${booking.carName} reservation is confirmed.`
          : `Your ${booking.carName} reservation has been cancelled.`,
      icon:
        booking.status === "Confirmed"
          ? "checkmark-circle-outline"
          : "close-circle-outline",
      date: booking.createdAt,
    }));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Notifications 🔔</Text>
      <Text style={styles.subtitle}>Your latest booking updates</Text>

      {notifications.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons
            name="notifications-off-outline"
            size={75}
            color={COLORS.primary}
          />
          <Text style={styles.emptyTitle}>No Notifications</Text>
          <Text style={styles.muted}>
            Your booking updates will appear here.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {notifications.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.iconBox}>
                <Ionicons name={item.icon} size={27} color={COLORS.primary} />
              </View>

              <View style={styles.textBox}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.message}>{item.message}</Text>
                <Text style={styles.date}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 22, paddingTop: 55, paddingBottom: 45, flexGrow: 1 },
  title: { color: COLORS.white, fontSize: 30, fontWeight: "900", marginTop: 30 },
  subtitle: { color: COLORS.textSecondary, marginTop: 10 },
  list: { marginTop: 30 },
  card: {
    backgroundColor: COLORS.surface, padding: 18,
    borderRadius: 18, marginBottom: 14,
    flexDirection: "row", alignItems: "flex-start"
  },
  iconBox: {
    backgroundColor: COLORS.surfaceLight,
    width: 48, height: 48, borderRadius: 14,
    alignItems: "center", justifyContent: "center"
  },
  textBox: { flex: 1, marginLeft: 15 },
  cardTitle: { color: COLORS.white, fontWeight: "800", fontSize: 16 },
  message: { color: COLORS.textSecondary, marginTop: 8, lineHeight: 21 },
  date: { color: COLORS.primary, fontSize: 12, marginTop: 12 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center" },
  emptyTitle: {
    color: COLORS.white, fontSize: 22,
    fontWeight: "800", marginTop: 25
  },
  muted: { color: COLORS.textSecondary, textAlign: "center", marginTop: 12 },
});
