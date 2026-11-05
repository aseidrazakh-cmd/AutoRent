import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookingContext = createContext(null);
const KEY = "@autorent_bookings";

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const saved = await AsyncStorage.getItem(KEY);
        if (saved) setBookings(JSON.parse(saved));
      } catch (error) {
        console.log("Booking load error:", error);
      } finally {
        setReady(true);
      }
    }
    load();
  }, []);

  async function saveBookings(updated) {
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
    setBookings(updated);
  }

  async function createBooking(details) {
    const booking = {
      ...details,
      id: Date.now().toString(),
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    try {
      await saveBookings([booking, ...bookings]);
      return { success: true, booking };
    } catch {
      return { success: false, message: "Booking could not be saved." };
    }
  }

  async function cancelBooking(id) {
    const updated = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    try {
      await saveBookings(updated);
      return true;
    } catch {
      return false;
    }
  }

  return (
    <BookingContext.Provider
      value={{ bookings, ready, createBooking, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings must be used inside BookingProvider");
  }
  return context;
}
