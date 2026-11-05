import React, { useState, useEffect } from "react";
import {
  View, Text, TextInput, ScrollView,
  TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import CarCard from "../components/CarCard";
import { COLORS } from "../components/theme";
import { cars, categories } from "../data/cars";

export default function SearchScreen() {
  const params = useLocalSearchParams();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (typeof params.category === "string") {
      setSelectedCategory(params.category);
    }
  }, [params.category]);

  const filteredCars = cars.filter((car) => {
    const matchesSearch =
      car.name.toLowerCase().includes(query.toLowerCase()) ||
      car.brand.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      car.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Find Your Car 🔎</Text>
      <Text style={styles.subtitle}>Explore our premium collection</Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={23} color={COLORS.primary} />
        <TextInput
          style={styles.input}
          placeholder="Search BMW, Toyota, Audi..."
          placeholderTextColor={COLORS.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close-circle" size={21} color={COLORS.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {categories.map((category) => {
          const active = selectedCategory === category.name;

          return (
            <TouchableOpacity
              key={category.id}
              style={[styles.category, active && styles.activeCategory]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={[
                styles.categoryText,
                active && styles.activeCategoryText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Text style={styles.results}>
        {filteredCars.length} Cars Available
      </Text>

      {filteredCars.length > 0 ? (
        filteredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))
      ) : (
        <View style={styles.empty}>
          <Ionicons name="search-outline" size={65} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>No cars found</Text>
          <Text style={styles.emptyText}>
            Try another name or category.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: {
    paddingHorizontal: 20, paddingTop: 55, paddingBottom: 35
  },
  title: {
    color: COLORS.white, fontSize: 30, fontWeight: "900"
  },
  subtitle: {
    color: COLORS.textSecondary, fontSize: 15, marginTop: 10
  },
  searchBox: {
    backgroundColor: COLORS.surface, height: 58,
    borderRadius: 17, flexDirection: "row",
    alignItems: "center", paddingHorizontal: 16,
    marginTop: 30, borderWidth: 1, borderColor: COLORS.border,
  },
  input: {
    flex: 1, color: COLORS.white, fontSize: 15, marginLeft: 12
  },
  categories: { marginTop: 25, marginBottom: 28 },
  category: {
    paddingHorizontal: 22, paddingVertical: 13,
    backgroundColor: COLORS.surface,
    borderRadius: 25, marginRight: 10,
  },
  activeCategory: { backgroundColor: COLORS.primary },
  categoryText: {
    color: COLORS.textSecondary, fontWeight: "700"
  },
  activeCategoryText: { color: COLORS.white },
  results: {
    color: COLORS.white, fontSize: 19,
    fontWeight: "800", marginBottom: 20,
  },
  empty: { alignItems: "center", paddingVertical: 90 },
  emptyTitle: {
    color: COLORS.white, fontSize: 21,
    fontWeight: "800", marginTop: 20,
  },
  emptyText: { color: COLORS.textSecondary, marginTop: 10 },
});
