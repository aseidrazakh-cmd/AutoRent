import React, { useState } from "react";
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { cars, formatPrice } from "../data/cars";
import { useApp } from "../context/AppContext";
import { useBookings } from "../context/BookingContext";
import { COLORS } from "../components/theme";

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const date = new Date(value + "T00:00:00Z");
  if (Number.isNaN(date.getTime())) return null;

  return date.toISOString().slice(0, 10) === value ? date : null;
}

export default function BookingScreen() {
  const { id } = useLocalSearchParams();
  const car = cars.find((item) => item.id === id);
  const { user } = useApp();
  const { createBooking } = useBookings();

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [location, setLocation] = useState("Almaty");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!car) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Car not found</Text>
      </View>
    );
  }

  const start = parseDate(pickup);
  const end = parseDate(dropoff);
  const today = parseDate(new Date().toISOString().slice(0, 10));

  const days = start && end
    ? Math.round((end.getTime() - start.getTime()) / 86400000)
    : 0;

  const validDates = start && end && start >= today && days > 0;
  const total = validDates ? days * car.price : 0;

  async function handleBooking() {
    setError("");

    if (!user) {
      router.push("/login");
      return;
    }

    if (!validDates) {
      setError("Enter valid future dates. Return must be after pickup.");
      return;
    }

    if (!location.trim()) {
      setError("Enter pickup location.");
      return;
    }

    setSaving(true);

    try {
      const result = await createBooking({
        carId: car.id,
        carName: car.name,
        carImage: car.image,
        userEmail: user.email,
        pickupDate: pickup,
        returnDate: dropoff,
        location: location.trim(),
        days,
        pricePerDay: car.price,
        total,
      });

      if (result.success) {
        router.replace({
          pathname: "/booking-confirmation",
          params: { bookingId: result.booking.id },
        });
      } else {
        setError(result.message);
      }
    } finally {
      setSaving(false);
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

      <Text style={styles.title}>Book Your Car 📅</Text>
      <Text style={styles.subtitle}>Complete your rental details</Text>

      <View style={styles.carBox}>
        <Ionicons name="car-sport" size={42} color={COLORS.primary} />
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.carName}>{car.name}</Text>
          <Text style={styles.muted}>{formatPrice(car.price)} / day</Text>
        </View>
      </View>

      <Text style={styles.label}>Pickup Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Almaty"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text style={styles.label}>Pickup Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={pickup}
        onChangeText={setPickup}
        placeholder="2026-11-10"
        placeholderTextColor={COLORS.textSecondary}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Return Date (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={dropoff}
        onChangeText={setDropoff}
        placeholder="2026-11-13"
        placeholderTextColor={COLORS.textSecondary}
        autoCapitalize="none"
      />

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Price Summary</Text>

        <View style={styles.line}>
          <Text style={styles.muted}>Price per day</Text>
          <Text style={styles.value}>{formatPrice(car.price)}</Text>
        </View>

        <View style={styles.line}>
          <Text style={styles.muted}>Rental duration</Text>
          <Text style={styles.value}>{validDates ? days : 0} days</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.line}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.total}>{formatPrice(total)}</Text>
        </View>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.button, saving && { opacity: 0.5 }]}
        onPress={handleBooking}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? "Saving..." : "Confirm Booking"}
        </Text>
        <Ionicons name="checkmark-circle-outline" size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.note}>
        Demo booking only. No payment will be charged.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 23, paddingTop: 55, paddingBottom: 45 },
  title: { color: COLORS.white, fontSize: 30, fontWeight: "900", marginTop: 30 },
  subtitle: { color: COLORS.textSecondary, marginTop: 10 },
  carBox: {
    backgroundColor: COLORS.surface, borderRadius: 20,
    padding: 20, flexDirection: "row", alignItems: "center",
    marginTop: 30, marginBottom: 28
  },
  carName: { color: COLORS.white, fontSize: 18, fontWeight: "800" },
  muted: { color: COLORS.textSecondary, fontSize: 14, marginTop: 6 },
  label: { color: COLORS.white, fontWeight: "700", marginBottom: 10 },
  input: {
    backgroundColor: COLORS.surface, borderRadius: 15,
    color: COLORS.white, padding: 17, fontSize: 15, marginBottom: 24,
    borderWidth: 1, borderColor: COLORS.border
  },
  summary: { backgroundColor: COLORS.surface, borderRadius: 20, padding: 22 },
  summaryTitle: { color: COLORS.white, fontSize: 20, fontWeight: "800", marginBottom: 18 },
  line: { flexDirection: "row", justifyContent: "space-between", marginBottom: 14 },
  value: { color: COLORS.white, fontWeight: "700" },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },
  totalLabel: { color: COLORS.white, fontSize: 17, fontWeight: "800" },
  total: { color: COLORS.primary, fontSize: 23, fontWeight: "900" },
  error: { color: COLORS.danger, marginTop: 20, fontWeight: "700" },
  button: {
    backgroundColor: COLORS.primary, borderRadius: 17,
    height: 60, flexDirection: "row", justifyContent: "center",
    alignItems: "center", gap: 12, marginTop: 28
  },
  buttonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800" },
  note: { color: COLORS.textSecondary, textAlign: "center", marginTop: 18 },
});
