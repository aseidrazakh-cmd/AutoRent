import React from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
type IconName = React.ComponentProps<typeof Ionicons>["name"];
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import CarCard from "../components/CarCard";
import { COLORS } from "../components/theme";
import { cars, categories } from "../data/cars";
import { useApp } from "../context/AppContext";

export default function HomeScreen() {
  const { user } = useApp();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, {user?.name || "Driver"} 👋
          </Text>
          <View style={styles.location}>
            <Ionicons name="location" size={16} color={COLORS.primary} />
            <Text style={styles.locationText}>Almaty, Kazakhstan</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notification}
          onPress={() => router.push("/notifications")}
        >
          <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.brand}>
        Auto<Text style={styles.blue}>Rent</Text>
      </Text>

      <Text style={styles.heading}>
        Find Your{"\n"}
        <Text style={styles.blue}>Dream Car.</Text>
      </Text>

      <TouchableOpacity
        style={styles.searchBox}
        onPress={() => router.push("/(tabs)/search")}
      >
        <Ionicons name="search-outline" size={22} color={COLORS.textSecondary} />
        <Text style={styles.searchText}>Search your perfect car...</Text>
        <Ionicons name="options-outline" size={22} color={COLORS.primary} />
      </TouchableOpacity>

      <LinearGradient
        colors={["#2563EB", "#7C3AED"]}
        style={styles.banner}
      >
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>
            Premium Cars{"\n"}Best Prices
          </Text>
          <Text style={styles.bannerSubtitle}>
            Discover your next adventure
          </Text>

          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => router.push("/(tabs)/search")}
          >
            <Text style={styles.bannerButtonText}>Explore Cars →</Text>
          </TouchableOpacity>
        </View>

        <Ionicons
          name="car-sport"
          size={110}
          color="rgba(255,255,255,0.25)"
        />
      </LinearGradient>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <TouchableOpacity onPress={() => router.push("/categories")}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.category}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/search",
                params: { category: category.name },
              })
            }
          >
            <Ionicons
              name={category.icon as IconName}
              size={24}
              color={COLORS.primary}
            />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Cars 🔥</Text>
        <TouchableOpacity onPress={() => router.push("/(tabs)/search")}>
          <Text style={styles.seeAll}>View All</Text>
        </TouchableOpacity>
      </View>

      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: {
    paddingHorizontal: 20, paddingTop: 55, paddingBottom: 35
  },
  header: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: COLORS.white, fontSize: 16, fontWeight: "700"
  },
  location: {
    flexDirection: "row", alignItems: "center", marginTop: 8
  },
  locationText: {
    color: COLORS.textSecondary, marginLeft: 5, fontSize: 13
  },
  notification: {
    width: 45, height: 45, borderRadius: 15,
    backgroundColor: COLORS.surface,
    justifyContent: "center", alignItems: "center",
  },
  brand: {
    color: COLORS.white, fontSize: 23,
    fontWeight: "900", marginTop: 30
  },
  blue: { color: COLORS.primary },
  heading: {
    color: COLORS.white, fontSize: 36,
    fontWeight: "900", marginTop: 12, lineHeight: 43,
  },
  searchBox: {
    height: 58, backgroundColor: COLORS.surface,
    borderRadius: 17, flexDirection: "row",
    alignItems: "center", paddingHorizontal: 16,
    marginTop: 25, borderWidth: 1, borderColor: COLORS.border,
  },
  searchText: {
    flex: 1, color: COLORS.textSecondary,
    marginLeft: 12, fontSize: 14,
  },
  banner: {
    borderRadius: 25, padding: 22, marginTop: 28,
    flexDirection: "row", alignItems: "center", minHeight: 190,
  },
  bannerText: { flex: 1 },
  bannerTitle: {
    color: "#FFFFFF", fontSize: 23, fontWeight: "900"
  },
  bannerSubtitle: {
    color: "#E2E8F0", fontSize: 12, marginTop: 10
  },
  bannerButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 17, paddingVertical: 11,
    borderRadius: 12, alignSelf: "flex-start", marginTop: 20,
  },
  bannerButtonText: {
    color: "#2563EB", fontWeight: "800", fontSize: 12
  },
  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginTop: 35, marginBottom: 18,
  },
  sectionTitle: {
    color: COLORS.white, fontSize: 21, fontWeight: "800"
  },
  seeAll: {
    color: COLORS.primary, fontWeight: "700", fontSize: 13
  },
  category: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 18, paddingVertical: 15,
    borderRadius: 17, alignItems: "center",
    marginRight: 12, minWidth: 90,
  },
  categoryText: {
    color: COLORS.white, fontSize: 13,
    fontWeight: "700", marginTop: 9,
  },
});

