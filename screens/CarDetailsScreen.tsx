import React from "react";
import {
  View, Text, Image, ScrollView,
  TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
type IconName = React.ComponentProps<typeof Ionicons>["name"];
import { router, useLocalSearchParams } from "expo-router";

import { cars, formatPrice } from "../data/cars";
import { useApp } from "../context/AppContext";
import { COLORS } from "../components/theme";

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();
  const car = cars.find((item) => item.id === id);
  const { isFavorite, toggleFavorite } = useApp();

  if (!car) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Car not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const specs: { icon: IconName; label: string; value: string }[] = [
    { icon: "people-outline", label: "Seats", value: `${car.seats} People` },
    { icon: "settings-outline", label: "Transmission", value: car.transmission },
    { icon: "water-outline", label: "Fuel Type", value: car.fuel },
    { icon: "star-outline", label: "Rating", value: `${car.rating} / 5` },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageBox}>
          <Image source={{ uri: car.image }} style={styles.image} />

          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.heart}
            onPress={() => toggleFavorite(car.id)}
          >
            <Ionicons
              name={isFavorite(car.id) ? "heart" : "heart-outline"}
              size={24}
              color={isFavorite(car.id) ? "#EF4444" : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.body}>
          <Text style={styles.category}>{car.category} • {car.brand}</Text>
          <Text style={styles.title}>{car.name}</Text>

          <View style={styles.rating}>
            <Ionicons name="star" size={18} color="#F59E0B" />
            <Text style={styles.ratingText}>{car.rating} Premium Rated</Text>
          </View>

          <Text style={styles.sectionTitle}>Specifications</Text>

          <View style={styles.grid}>
            {specs.map((spec) => (
              <View key={spec.label} style={styles.specCard}>
                <Ionicons name={spec.icon} size={25} color={COLORS.primary} />
                <Text style={styles.specLabel}>{spec.label}</Text>
                <Text style={styles.specValue}>{spec.value}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>About this car</Text>
          <Text style={styles.description}>
            Experience comfort, performance and style with the {car.name}.
            Perfect for city drives, business meetings and unforgettable trips.
            Enjoy a premium rental experience with AutoRent.
          </Text>

          <Text style={styles.sectionTitle}>Included Features</Text>

          {[
            "Air Conditioning",
            "Bluetooth Connectivity",
            "GPS Navigation",
            "Comfortable Interior",
            "Premium Driving Experience",
          ].map((feature) => (
            <View key={feature} style={styles.feature}>
              <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <View>
          <Text style={styles.priceLabel}>Price per day</Text>
          <Text style={styles.price}>{formatPrice(car.price)}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push({
              pathname: "/booking",
              params: { id: car.id },
            })
          }
        >
          <Text style={styles.buttonText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  center: {
    flex: 1, backgroundColor: COLORS.background,
    justifyContent: "center", alignItems: "center"
  },
  content: { paddingBottom: 25 },
  imageBox: { height: 300, backgroundColor: COLORS.surface },
  image: { width: "100%", height: "100%" },
  back: {
    position: "absolute", top: 45, left: 20,
    width: 44, height: 44, borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center", justifyContent: "center"
  },
  heart: {
    position: "absolute", top: 45, right: 20,
    width: 44, height: 44, borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center", justifyContent: "center"
  },
  body: { padding: 22 },
  category: { color: COLORS.primary, fontWeight: "800", fontSize: 14 },
  title: {
    color: COLORS.white, fontSize: 30,
    fontWeight: "900", marginTop: 10
  },
  link: { color: COLORS.primary, marginTop: 20 },
  rating: { flexDirection: "row", alignItems: "center", marginTop: 15, gap: 8 },
  ratingText: { color: COLORS.textSecondary },
  sectionTitle: {
    color: COLORS.white, fontSize: 21,
    fontWeight: "800", marginTop: 32, marginBottom: 18
  },
  grid: {
    flexDirection: "row", flexWrap: "wrap",
    justifyContent: "space-between", gap: 12
  },
  specCard: {
    width: "48%", backgroundColor: COLORS.surface,
    borderRadius: 18, padding: 18
  },
  specLabel: { color: COLORS.textSecondary, fontSize: 12, marginTop: 12 },
  specValue: { color: COLORS.white, fontWeight: "800", marginTop: 5 },
  description: { color: COLORS.textSecondary, lineHeight: 25, fontSize: 15 },
  feature: { flexDirection: "row", alignItems: "center", marginBottom: 14, gap: 12 },
  featureText: { color: COLORS.white, fontSize: 15 },
  bottom: {
    backgroundColor: COLORS.surface, padding: 18,
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", borderTopWidth: 1, borderTopColor: COLORS.border
  },
  priceLabel: { color: COLORS.textSecondary, fontSize: 12 },
  price: { color: COLORS.primary, fontSize: 23, fontWeight: "900", marginTop: 5 },
  button: {
    backgroundColor: COLORS.primary, paddingHorizontal: 25,
    height: 55, borderRadius: 16,
    flexDirection: "row", alignItems: "center", gap: 10
  },
  buttonText: { color: "#FFFFFF", fontWeight: "800", fontSize: 16 },
});

