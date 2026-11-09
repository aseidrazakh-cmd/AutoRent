import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

import { COLORS } from "../components/theme";

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={["#0B0F19", "#111E38", "#0B0F19"]}
      style={styles.container}
    >
      <View style={styles.logoBox}>
        <LinearGradient
          colors={["#3B82F6", "#2563EB"]}
          style={styles.iconCircle}
        >
          <Ionicons
            name="car-sport"
            size={80}
            color="#FFFFFF"
          />
        </LinearGradient>

        <Text style={styles.logo}>
          Auto<Text style={styles.blue}>Rent</Text>
        </Text>

        <Text style={styles.tagline}>
          DRIVE YOUR DREAM
        </Text>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.title}>
          Your Journey{"\n"}Starts Here.
        </Text>

        <Text style={styles.subtitle}>
          Discover premium cars, book easily,
          and enjoy every mile of your journey.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/onboarding")}
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>

          <Ionicons
            name="arrow-forward"
            size={22}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
  },
  logoBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    color: COLORS.white,
    fontSize: 45,
    fontWeight: "900",
  },
  blue: {
    color: COLORS.primary,
  },
  tagline: {
    color: COLORS.textSecondary,
    fontSize: 13,
    letterSpacing: 4,
    marginTop: 12,
  },
  bottom: {
    paddingBottom: 65,
  },
  title: {
    color: COLORS.white,
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 47,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 25,
    marginTop: 18,
    marginBottom: 35,
  },
  button: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },
});
