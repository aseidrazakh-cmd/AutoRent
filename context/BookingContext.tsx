import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type BookingDetails = {
  carId: string;
  carName: string;
  carImage: string;
  userEmail: string;
  pickupDate: string;
  returnDate: string;
  location: string;
  days: number;
  pricePerDay: number;
  total: number;
};

export type Booking = BookingDetails & {
  id: string;
  status: "Confirmed" | "Cancelled";
  createdAt: string;
};

type BookingResult =
  | { success: true; booking: Booking }
  | { success: false; message: string };

type BookingContextType = {
  bookings: Booking[];
  ready: boolean;
  createBooking: (details: BookingDetails) => Promise<BookingResult>;
  cancelBooking: (id: string) => Promise<boolean>;
};

const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

const KEY = "@autorent_bookings";

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    async function load(): Promise<void> {
      try {
        const saved = await AsyncStorage.getItem(KEY);

        if (saved) {
          setBookings(JSON.parse(saved) as Booking[]);
        }
      } catch (error) {
        console.log("Booking load error:", error);
      } finally {
        setReady(true);
      }
    }

    void load();
  }, []);

  async function saveBookings(updated: Booking[]): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(updated));
    setBookings(updated);
  }

  async function createBooking(
    details: BookingDetails
  ): Promise<BookingResult> {
    const booking: Booking = {
      ...details,
      id: Date.now().toString(),
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    try {
      await saveBookings([booking, ...bookings]);
      return { success: true, booking };
    } catch {
      return {
        success: false,
        message: "Booking could not be saved.",
      };
    }
  }

  async function cancelBooking(id: string): Promise<boolean> {
    const updated: Booking[] = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status: "Cancelled" as const }
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

export function useBookings(): BookingContextType {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookings must be used inside BookingProvider");
  }

  return context;
}
