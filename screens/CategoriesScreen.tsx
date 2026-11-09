import React from "react";
import {
  View, Text, ScrollView,
  TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
type IconName = React.ComponentProps<typeof Ionicons>["name"];
import { router } from "expo-router";

import { categories, cars } from "../data/cars";
import { COLORS } from "../components/theme";

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>Car Categories 🚘</Text>
      <Text style={styles.subtitle}>Find the perfect type of car for your trip</Text>

      <View style={styles.list}>
        {categories.map((category) => {
          const count = category.name === "All"
            ? cars.length
            : cars.filter((car) => car.category === category.name).length;

          return (
            <TouchableOpacity
              key={category.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/search",
                  params: { category: category.name },
                })
              }
            >
              <View style={styles.iconBox}>
                <Ionicons name={category.icon as IconName} size={33} color={COLORS.primary} />
              </View>

              <View style={styles.info}>
                <Text style={styles.name}>{category.name}</Text>
                <Text style={styles.count}>{count} cars available</Text>
              </View>

              <Ionicons name="chevron-forward" size={23} color={COLORS.primary} />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 22, paddingTop: 55, paddingBottom: 45 },
  title: { color: COLORS.white, fontSize: 30, fontWeight: "900", marginTop: 30 },
  subtitle: { color: COLORS.textSecondary, marginTop: 10 },
  list: { marginTop: 35 },
  card: {
    backgroundColor: COLORS.surface, borderRadius: 20,
    padding: 20, flexDirection: "row",
    alignItems: "center", marginBottom: 16
  },
  iconBox: {
    width: 65, height: 65, borderRadius: 18,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: "center", alignItems: "center"
  },
  info: { flex: 1, marginLeft: 18 },
  name: { color: COLORS.white, fontSize: 20, fontWeight: "800" },
  count: { color: COLORS.textSecondary, marginTop: 8 },
});

