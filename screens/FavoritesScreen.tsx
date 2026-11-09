import React from "react";
import {
  View, Text, ScrollView, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CarCard from "../components/CarCard";
import { COLORS } from "../components/theme";
import { cars } from "../data/cars";
import { useApp } from "../context/AppContext";

export default function FavoritesScreen() {
  const { favorites } = useApp();

  const favoriteCars = cars.filter((car) =>
    favorites.includes(car.id)
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>My Favorites ❤️</Text>
      <Text style={styles.subtitle}>
        Your favorite cars in one place
      </Text>

      <Text style={styles.count}>
        {favoriteCars.length} Saved Cars
      </Text>

      {favoriteCars.length > 0 ? (
        favoriteCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))
      ) : (
        <View style={styles.empty}>
          <Ionicons name="heart-outline" size={75} color={COLORS.primary} />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart icon on any car to save it here.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: {
    paddingHorizontal: 20, paddingTop: 55,
    paddingBottom: 35, flexGrow: 1,
  },
  title: {
    color: COLORS.white, fontSize: 30, fontWeight: "900"
  },
  subtitle: {
    color: COLORS.textSecondary, marginTop: 10, fontSize: 15
  },
  count: {
    color: COLORS.white, fontSize: 19,
    fontWeight: "800", marginTop: 35, marginBottom: 20,
  },
  empty: {
    flex: 1, alignItems: "center",
    justifyContent: "center", paddingVertical: 80,
  },
  emptyTitle: {
    color: COLORS.white, fontSize: 23,
    fontWeight: "800", marginTop: 25,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: "center", marginTop: 12, lineHeight: 23,
  },
});
