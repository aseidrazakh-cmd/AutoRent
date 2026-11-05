import React from "react";
import {
  View, Text, Image, TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useApp } from "../context/AppContext";
import { formatPrice } from "../data/cars";
import { COLORS } from "./theme";

export default function CarCard({ car }) {
  const { isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(car.id);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() =>
        router.push({
          pathname: "/car-details",
          params: { id: car.id },
        })
      }
    >
      <View style={styles.imageBox}>
        <Image
          source={{ uri: car.image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.category}>
          <Text style={styles.categoryText}>{car.category}</Text>
        </View>

        <TouchableOpacity
          style={styles.heart}
          onPress={() => toggleFavorite(car.id)}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={23}
            color={favorite ? "#EF4444" : "#FFFFFF"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {car.name}
          </Text>

          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={styles.ratingText}>{car.rating}</Text>
          </View>
        </View>

        <View style={styles.specs}>
          <Ionicons name="people-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.specText}>{car.seats} Seats</Text>

          <Ionicons name="settings-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.specText}>{car.transmission}</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.priceLabel}>Starting from</Text>
            <Text style={styles.price}>
              {formatPrice(car.price)}
              <Text style={styles.day}> / day</Text>
            </Text>
          </View>

          <View style={styles.arrow}>
            <Ionicons name="arrow-forward" size={21} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 22,
    marginBottom: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  imageBox: {
    height: 190,
    position: "relative",
    backgroundColor: COLORS.surfaceLight,
  },
  image: { width: "100%", height: "100%" },
  category: {
    position: "absolute", top: 15, left: 15,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: 20,
  },
  categoryText: {
    color: "#FFFFFF", fontSize: 12, fontWeight: "700"
  },
  heart: {
    position: "absolute", top: 12, right: 12,
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(11,15,25,0.75)",
    justifyContent: "center", alignItems: "center",
  },
  content: { padding: 18 },
  titleRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: COLORS.white, fontSize: 19,
    fontWeight: "800", flex: 1, marginRight: 10,
  },
  rating: { flexDirection: "row", alignItems: "center" },
  ratingText: {
    color: COLORS.white, marginLeft: 5, fontWeight: "700"
  },
  specs: {
    flexDirection: "row", alignItems: "center",
    marginTop: 15, gap: 7,
  },
  specText: {
    color: COLORS.textSecondary, fontSize: 12, marginRight: 12
  },
  footer: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 22, paddingTop: 15,
    borderTopWidth: 1, borderTopColor: COLORS.border,
  },
  priceLabel: { color: COLORS.textSecondary, fontSize: 12 },
  price: {
    color: COLORS.primary, fontSize: 21,
    fontWeight: "900", marginTop: 5,
  },
  day: {
    color: COLORS.textSecondary, fontSize: 12, fontWeight: "400"
  },
  arrow: {
    backgroundColor: COLORS.primary,
    width: 43, height: 43, borderRadius: 14,
    alignItems: "center", justifyContent: "center",
  },
});
