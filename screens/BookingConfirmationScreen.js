import React from "react";
import {
  View, Text, TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { useBookings } from "../context/BookingContext";
import { formatPrice } from "../data/cars";
import { COLORS } from "../components/theme";

export default function BookingConfirmationScreen() {
  const { bookingId } = useLocalSearchParams();
  const { bookings } = useBookings();

  const booking = bookings.find((item) => item.id === bookingId);

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="checkmark" size={80} color="#FFFFFF" />
      </View>

      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.subtitle}>
        Your car reservation has been saved successfully.
      </Text>

      {booking && (
        <View style={styles.card}>
          <Text style={styles.carName}>{booking.carName}</Text>
          <Text style={styles.detail}>Booking ID: {booking.id}</Text>
          <Text style={styles.detail}>Pickup: {booking.pickupDate}</Text>
          <Text style={styles.detail}>Return: {booking.returnDate}</Text>
          <Text style={styles.detail}>Location: {booking.location}</Text>
          <Text style={styles.price}>{formatPrice(booking.total)}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(tabs)/bookings")}
      >
        <Text style={styles.buttonText}>View My Bookings</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/(tabs)/home")}>
        <Text style={styles.link}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: COLORS.background,
    padding: 25, alignItems: "center", justifyContent: "center"
  },
  iconCircle: {
    backgroundColor: COLORS.success, width: 130,
    height: 130, borderRadius: 65,
    alignItems: "center", justifyContent: "center"
  },
  title: {
    color: COLORS.white, fontSize: 29, fontWeight: "900",
    marginTop: 35, textAlign: "center"
  },
  subtitle: {
    color: COLORS.textSecondary, textAlign: "center",
    marginTop: 14, lineHeight: 23
  },
  card: {
    backgroundColor: COLORS.surface, width: "100%",
    maxWidth: 500, borderRadius: 22, padding: 24, marginTop: 35
  },
  carName: { color: COLORS.white, fontSize: 21, fontWeight: "800", marginBottom: 15 },
  detail: { color: COLORS.textSecondary, marginTop: 10 },
  price: { color: COLORS.primary, fontSize: 26, fontWeight: "900", marginTop: 22 },
  button: {
    backgroundColor: COLORS.primary, padding: 19,
    borderRadius: 16, width: "100%", maxWidth: 500,
    alignItems: "center", marginTop: 35
  },
  buttonText: { color: "#FFFFFF", fontWeight: "800" },
  link: { color: COLORS.primary, marginTop: 25, fontWeight: "700" },
});
