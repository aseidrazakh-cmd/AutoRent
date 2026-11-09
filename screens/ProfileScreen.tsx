import React from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
type IconName = React.ComponentProps<typeof Ionicons>["name"];
import { router, type Href } from "expo-router";

import { useApp } from "../context/AppContext";
import { useBookings } from "../context/BookingContext";
import { COLORS } from "../components/theme";

const menuItems: { title: string; icon: IconName; route: Href }[] = [
  { title: "Edit Profile", icon: "person-outline", route: "/edit-profile" },
  { title: "My Bookings", icon: "calendar-outline", route: "/(tabs)/bookings" },
  { title: "Payment Methods", icon: "card-outline", route: "/payment" },
  { title: "Notifications", icon: "notifications-outline", route: "/notifications" },
  { title: "Compare Cars", icon: "git-compare-outline", route: "/comparison" },
  { title: "Settings", icon: "settings-outline", route: "/settings" },
  { title: "Help & Support", icon: "help-circle-outline", route: "/support" },
];

export default function ProfileScreen() {
  const { user, logout } = useApp();
  const { bookings } = useBookings();

  const myBookings = bookings.filter(
    (booking) => booking.userEmail === user?.email
  );

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.heading}>My Profile 👤</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={45} color="#FFFFFF" />
        </View>

        <Text style={styles.name}>
          {user?.name || "AutoRent User"}
        </Text>

        <Text style={styles.email}>
          {user?.email || "No email"}
        </Text>

        <View style={styles.badge}>
          <Ionicons name="checkmark-circle" size={15} color={COLORS.primary} />
          <Text style={styles.badgeText}>Demo Member</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{myBookings.length}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {myBookings.filter((item) => item.status === "Confirmed").length}
          </Text>
          <Text style={styles.statLabel}>Confirmed</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Account</Text>

      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.title}
          style={styles.menuItem}
          onPress={() => router.push(item.route)}
        >
          <View style={styles.menuIcon}>
            <Ionicons name={item.icon} size={22} color={COLORS.primary} />
          </View>

          <Text style={styles.menuText}>{item.title}</Text>

          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color={COLORS.danger} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.version}>AutoRent v1.0 • Student Project</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingTop: 55, paddingBottom: 40 },
  heading: { color: COLORS.white, fontSize: 30, fontWeight: "900" },
  profileCard: {
    backgroundColor: COLORS.surface, borderRadius: 24,
    padding: 28, alignItems: "center", marginTop: 25
  },
  avatar: {
    width: 95, height: 95, borderRadius: 48,
    backgroundColor: COLORS.primary, alignItems: "center",
    justifyContent: "center"
  },
  name: {
    color: COLORS.white, fontSize: 24,
    fontWeight: "900", marginTop: 18
  },
  email: { color: COLORS.textSecondary, marginTop: 8 },
  badge: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 15, paddingVertical: 8,
    borderRadius: 20, marginTop: 18, gap: 7
  },
  badgeText: { color: COLORS.white, fontSize: 12 },
  stats: {
    flexDirection: "row", backgroundColor: COLORS.surface,
    borderRadius: 20, marginTop: 18, padding: 20
  },
  stat: { flex: 1, alignItems: "center" },
  statNumber: {
    color: COLORS.primary, fontSize: 26, fontWeight: "900"
  },
  statLabel: { color: COLORS.textSecondary, marginTop: 7 },
  sectionTitle: {
    color: COLORS.white, fontSize: 20,
    fontWeight: "800", marginTop: 32, marginBottom: 15
  },
  menuItem: {
    backgroundColor: COLORS.surface, padding: 15,
    borderRadius: 16, flexDirection: "row",
    alignItems: "center", marginBottom: 11
  },
  menuIcon: {
    width: 42, height: 42, backgroundColor: COLORS.surfaceLight,
    borderRadius: 12, alignItems: "center", justifyContent: "center"
  },
  menuText: {
    color: COLORS.white, fontSize: 15,
    fontWeight: "700", flex: 1, marginLeft: 15
  },
  logout: {
    flexDirection: "row", justifyContent: "center",
    alignItems: "center", borderWidth: 1,
    borderColor: COLORS.danger, borderRadius: 16,
    padding: 17, marginTop: 25, gap: 10
  },
  logoutText: { color: COLORS.danger, fontWeight: "800" },
  version: {
    color: COLORS.textSecondary, textAlign: "center",
    marginTop: 25, fontSize: 12
  },
});


