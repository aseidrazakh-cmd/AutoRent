import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

const BLUE = "#3B82F6";
const MUTED = "#94A3B8";

type IconName = ComponentProps<typeof Ionicons>["name"];

const tabs: { name: string; title: string; icon: IconName }[] = [
  { name: "home", title: "Home", icon: "home-outline" },
  { name: "search", title: "Search", icon: "search-outline" },
  { name: "favorites", title: "Favorites", icon: "heart-outline" },
  { name: "bookings", title: "Bookings", icon: "calendar-outline" },
  { name: "profile", title: "Profile", icon: "person-outline" },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: BLUE,
        tabBarInactiveTintColor: MUTED,
        tabBarStyle: {
          backgroundColor: "#111827",
          borderTopColor: "#1E293B",
          borderTopWidth: 1,
          height: 65,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name={tab.icon}
                size={size}
                color={String(color)}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

