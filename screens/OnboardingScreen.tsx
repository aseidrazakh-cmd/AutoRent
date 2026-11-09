import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
type IconName = React.ComponentProps<typeof Ionicons>["name"];
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const slides = [
  {
    icon: "car-sport",
    title: "Find Your Dream Car",
    description: "Explore our collection of premium cars and find the perfect ride for every occasion.",
  },
  {
    icon: "calendar",
    title: "Easy & Fast Booking",
    description: "Choose your favorite car, select rental dates, and book in just a few simple steps.",
  },
  {
    icon: "navigate",
    title: "Enjoy Your Journey",
    description: "Experience freedom, comfort, and unforgettable adventures with AutoRent.",
  },
];

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const { width } = useWindowDimensions();
  const current = slides[step];

  function next() {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      router.replace("/login");
    }
  }

  return (
    <LinearGradient
      colors={["#0B0F19", "#142343", "#0B0F19"]}
      style={styles.container}
    >
      <View style={styles.top}>
        <Text style={styles.logo}>
          Auto<Text style={styles.blue}>Rent</Text>
        </Text>

        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.center}>
        <LinearGradient
          colors={["#3B82F6", "#1D4ED8"]}
          style={[
            styles.iconBox,
            { width: Math.min(width * 0.48, 210), height: 200 },
          ]}
        >
          <Ionicons name={current.icon as IconName} size={105} color="#FFFFFF" />
        </LinearGradient>

        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.description}>{current.description}</Text>

        <View style={styles.dots}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === step && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={next}>
          <Text style={styles.buttonText}>
            {step === 2 ? "Get Started" : "Continue"}
          </Text>
          <Ionicons name="arrow-forward" size={21} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.counter}>{step + 1} / 3</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 55,
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "900",
  },
  blue: {
    color: "#3B82F6",
  },
  skip: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "700",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconBox: {
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 45,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },
  description: {
    color: "#94A3B8",
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    marginTop: 20,
    maxWidth: 380,
  },
  dots: {
    flexDirection: "row",
    gap: 9,
    marginTop: 35,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#334155",
  },
  activeDot: {
    width: 30,
    backgroundColor: "#3B82F6",
  },
  bottom: {
    paddingBottom: 45,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3B82F6",
    width: "100%",
    maxWidth: 450,
    height: 60,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  counter: {
    color: "#64748B",
    marginTop: 20,
  },
});

