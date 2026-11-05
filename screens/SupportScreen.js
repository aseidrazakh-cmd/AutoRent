import React, { useState } from "react";
import {
  View, Text, ScrollView,
  TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { COLORS } from "../components/theme";

const faqs = [
  {
    question: "How do I book a car?",
    answer: "Choose a car, open its details, select rental dates and confirm your booking.",
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes. Open My Bookings and tap Cancel on an active reservation.",
  },
  {
    question: "How is the rental price calculated?",
    answer: "The total price is calculated by multiplying the daily rental price by the number of days.",
  },
  {
    question: "Can I save my favorite cars?",
    answer: "Yes. Tap the heart icon on any car to add it to Favorites.",
  },
  {
    question: "Is payment real?",
    answer: "No. AutoRent is currently a student demo application. No real payments are processed.",
  },
];

export default function SupportScreen() {
  const [opened, setOpened] = useState(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={27} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.hero}>
        <Ionicons name="headset-outline" size={65} color={COLORS.primary} />
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>
          How can we help you today?
        </Text>
      </View>

      <Text style={styles.section}>Frequently Asked Questions</Text>

      {faqs.map((faq, index) => (
        <TouchableOpacity
          key={index}
          style={styles.faq}
          onPress={() => setOpened(opened === index ? null : index)}
        >
          <View style={styles.questionRow}>
            <Text style={styles.question}>{faq.question}</Text>
            <Ionicons
              name={opened === index ? "chevron-up" : "chevron-down"}
              size={21}
              color={COLORS.primary}
            />
          </View>

          {opened === index && (
            <Text style={styles.answer}>{faq.answer}</Text>
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.notice}>
        <Ionicons name="information-circle-outline" size={24} color={COLORS.primary} />
        <Text style={styles.noticeText}>
          AutoRent is a university demo project. Live customer support is not available.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 22, paddingTop: 55, paddingBottom: 45 },
  hero: { alignItems: "center", marginTop: 45 },
  title: { color: COLORS.white, fontSize: 29, fontWeight: "900", marginTop: 22 },
  subtitle: { color: COLORS.textSecondary, marginTop: 12 },
  section: {
    color: COLORS.white, fontSize: 21,
    fontWeight: "800", marginTop: 45, marginBottom: 18
  },
  faq: {
    backgroundColor: COLORS.surface, padding: 20,
    borderRadius: 17, marginBottom: 13
  },
  questionRow: {
    flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", gap: 15
  },
  question: { color: COLORS.white, fontSize: 15, fontWeight: "700", flex: 1 },
  answer: {
    color: COLORS.textSecondary, lineHeight: 23,
    marginTop: 18, fontSize: 14
  },
  notice: {
    flexDirection: "row", backgroundColor: COLORS.surface,
    padding: 20, borderRadius: 17, marginTop: 30, gap: 13
  },
  noticeText: {
    color: COLORS.textSecondary, flex: 1, lineHeight: 21
  },
});
