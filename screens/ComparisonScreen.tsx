import React, { useState } from "react";
import {
  View, Text, ScrollView, Image,
  TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { cars, formatPrice, type Car } from "../data/cars";
import { COLORS } from "../components/theme";

export default function ComparisonScreen() {
  const [firstId, setFirstId] = useState("1");
  const [secondId, setSecondId] = useState("2");

  const first = cars.find((car) => car.id === firstId);
  const second = cars.find((car) => car.id === secondId);

  const rows: { label: string; key: keyof Car }[] = [
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Seats", key: "seats" },
    { label: "Transmission", key: "transmission" },
    { label: "Fuel", key: "fuel" },
    { label: "Rating", key: "rating" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Compare Cars ⚖️</Text>
      <Text style={styles.subtitle}>Choose two cars and compare their features</Text>

      <Text style={styles.section}>First Car</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cars.map((car) => (
          <TouchableOpacity
            key={car.id}
            style={[styles.chip, firstId === car.id && styles.activeChip]}
            onPress={() => setFirstId(car.id)}
          >
            <Text style={[styles.chipText, firstId === car.id && styles.activeText]}>
              {car.brand}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.section}>Second Car</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {cars.map((car) => (
          <TouchableOpacity
            key={car.id}
            style={[styles.chip, secondId === car.id && styles.activeChip]}
            onPress={() => setSecondId(car.id)}
          >
            <Text style={[styles.chipText, secondId === car.id && styles.activeText]}>
              {car.brand}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.compareHeader}>
        {[first, second].filter((car): car is Car => car !== undefined).map((car) => (
          <View key={car.id} style={styles.carBox}>
            <Image source={{ uri: car.image }} style={styles.image} />
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.price}>{formatPrice(car.price)}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.section}>Specifications</Text>

      {rows.map((row) => (
        <View key={row.key} style={styles.specRow}>
          <Text style={styles.specLabel}>{row.label}</Text>

          <View style={styles.values}>
            <Text style={styles.value}>{String(first?.[row.key] ?? "—")}</Text>
            <Text style={styles.value}>{String(second?.[row.key] ?? "—")}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.note}>Prices are shown per day in KZT.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingTop: 55, paddingBottom: 45 },
  title: { color: COLORS.white, fontSize: 30, fontWeight: "900", marginTop: 30 },
  subtitle: { color: COLORS.textSecondary, marginTop: 10 },
  section: {
    color: COLORS.white, fontSize: 19,
    fontWeight: "800", marginTop: 30, marginBottom: 16
  },
  chip: {
    backgroundColor: COLORS.surface, borderRadius: 20,
    paddingHorizontal: 17, paddingVertical: 12, marginRight: 9
  },
  activeChip: { backgroundColor: COLORS.primary },
  chipText: { color: COLORS.textSecondary, fontWeight: "700" },
  activeText: { color: "#FFFFFF" },
  compareHeader: {
    flexDirection: "row", gap: 12, marginTop: 30
  },
  carBox: {
    flex: 1, backgroundColor: COLORS.surface,
    borderRadius: 17, padding: 12
  },
  image: { width: "100%", height: 110, borderRadius: 12 },
  carName: {
    color: COLORS.white, fontSize: 14,
    fontWeight: "800", marginTop: 12
  },
  price: {
    color: COLORS.primary, fontWeight: "900",
    marginTop: 9, fontSize: 15
  },
  specRow: {
    backgroundColor: COLORS.surface, borderRadius: 14,
    padding: 15, marginBottom: 10
  },
  specLabel: {
    color: COLORS.textSecondary, fontSize: 12, marginBottom: 10
  },
  values: { flexDirection: "row" },
  value: {
    color: COLORS.white, flex: 1,
    fontSize: 14, fontWeight: "700"
  },
  note: {
    color: COLORS.textSecondary, textAlign: "center", marginTop: 25
  },
});

