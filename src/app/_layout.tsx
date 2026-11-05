import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppProvider } from "../../context/AppContext";
import { BookingProvider } from "../../context/BookingContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <BookingProvider>
        <StatusBar style="light" />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#0B0F19",
            },
          }}
        />
      </BookingProvider>
    </AppProvider>
  );
}
