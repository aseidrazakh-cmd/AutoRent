import React from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert, Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useBookings } from "../context/BookingContext";
import { useApp } from "../context/AppContext";
import { formatPrice } from "../data/cars";
import { COLORS } from "../components/theme";

export default function MyBookingsScreen() {
  const { bookings, cancelBooking } = useBookings();
  const { user } = useApp();

  const myBookings = bookings.filter(
    (booking) => booking.userEmail === user?.email
  );

  async function handleCancel(id: string) {
    if (Platform.OS === "web") {
      if (window.confirm("Cancel this booking?")) {
        await cancelBooking(id);
      }
    } else {
      Alert.alert("Cancel Booking", "Are you sure?", [
        { text: "No", style: "cancel" },
        { text: "Yes", style: "destructive", onPress: () => cancelBooking(id) },
      ]);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>My Bookings 📅</Text>
      <Text style={styles.subtitle}>Manage your car reservations</Text>

      <Text style={styles.count}>{myBookings.length} Reservations</Text>

      {myBookings.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="calendar-outline" size={75} color={COLORS.primary} />
          <Text style={styles.emptyTitle}>No Bookings Yet</Text>
          <Text style={styles.muted}>Your reservations will appear here.</Text>
        </View>
      ) : (
        myBookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <View style={styles.top}>
              <Text style={styles.carName}>{booking.carName}</Text>
              <Text
                style={[
                  styles.status,
                  {
                    color: booking.status === "Confirmed"
                      ? COLORS.success
                      : COLORS.danger,
                  },
                ]}
              >
                {booking.status}
              </Text>
            </View>

            <View style={styles.info}>
              <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
              <Text style={styles.muted}>
                {booking.pickupDate} → {booking.returnDate}
              </Text>
            </View>

            <View style={styles.info}>
              <Ionicons name="location-outline" size={18} color={COLORS.primary} />
              <Text style={styles.muted}>{booking.location}</Text>
            </View>

            <View style={styles.info}>
              <Ionicons name="time-outline" size={18} color={COLORS.primary} />
              <Text style={styles.muted}>{booking.days} days</Text>
            </View>

            <View style={styles.bottom}>
              <Text style={styles.price}>{formatPrice(booking.total)}</Text>

              {booking.status === "Confirmed" && (
                <TouchableOpacity
                  style={styles.cancel}
                  onPress={() => handleCancel(booking.id)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingTop: 55, paddingBottom: 45, flexGrow: 1 },
  title: { color: COLORS.white, fontSize: 30, fontWeight: "900" },
  subtitle: { color: COLORS.textSecondary, marginTop: 10 },
  count: {
    color: COLORS.white, fontSize: 19,
    fontWeight: "800", marginTop: 35, marginBottom: 20
  },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 80 },
  emptyTitle: {
    color: COLORS.white, fontSize: 23,
    fontWeight: "800", marginTop: 25, marginBottom: 12
  },
  muted: { color: COLORS.textSecondary, fontSize: 14 },
  card: {
    backgroundColor: COLORS.surface, borderRadius: 20,
    padding: 20, marginBottom: 18,
    borderWidth: 1, borderColor: COLORS.border
  },
  top: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", gap: 10, marginBottom: 18
  },
  carName: { color: COLORS.white, fontSize: 18, fontWeight: "800", flex: 1 },
  status: { fontSize: 12, fontWeight: "800" },
  info: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 13 },
  bottom: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 10, paddingTop: 18,
    borderTopWidth: 1, borderTopColor: COLORS.border
  },
  price: { color: COLORS.primary, fontSize: 23, fontWeight: "900" },
  cancel: {
    borderWidth: 1, borderColor: COLORS.danger,
    paddingHorizontal: 18, paddingVertical: 11, borderRadius: 12
  },
  cancelText: { color: COLORS.danger, fontWeight: "800" },
});

