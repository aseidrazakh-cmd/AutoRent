import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  name: string;
  email: string;
};

type StoredUser = User & {
  id: string;
  password: string;
};

type Result = {
  success: boolean;
  message?: string;
};

type AppContextType = {
  user: User | null;
  loading: boolean;
  register: (name: string, email: string, password: string) => Promise<Result>;
  login: (email: string, password: string) => Promise<Result>;
  resetPassword: (email: string, newPassword: string) => Promise<Result>;
  logout: () => Promise<void>;
  favorites: string[];
  toggleFavorite: (carId: string | number) => Promise<void>;
  isFavorite: (carId: string | number) => boolean;
  updateProfile: (newName: string) => Promise<Result>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const USERS_KEY = "@autorent_demo_users";
const SESSION_KEY = "@autorent_session";
const FAVORITES_KEY = "@autorent_favorites";

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData(): Promise<void> {
      try {
        const savedUsers = await AsyncStorage.getItem(USERS_KEY);
        const savedSession = await AsyncStorage.getItem(SESSION_KEY);
        const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);

        const parsedUsers: StoredUser[] = savedUsers
          ? JSON.parse(savedUsers)
          : [];

        setUsers(parsedUsers);
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);

        if (savedSession) {
          const session: { email: string } = JSON.parse(savedSession);

          const existingUser = parsedUsers.find(
            (item) => item.email === session.email
          );

          if (existingUser) {
            setUser({
              name: existingUser.name,
              email: existingUser.email,
            });
          }
        }
      } catch (error) {
        console.log("Storage error:", error);
      } finally {
        setLoading(false);
      }
    }

    void loadData();
  }, []);

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<Result> {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail || !password) {
      return { success: false, message: "Барлық өрісті толтыр!" };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return { success: false, message: "Email дұрыс емес!" };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Құпиясөз кемінде 6 таңбадан тұруы керек!",
      };
    }

    if (users.some((item) => item.email === normalizedEmail)) {
      return {
        success: false,
        message: "Бұл email бұрын тіркелген!",
      };
    }

    const newUser: StoredUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    const updatedUsers = [...users, newUser];

    try {
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
      await AsyncStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ email: normalizedEmail })
      );

      setUsers(updatedUsers);
      setUser({ name: newUser.name, email: newUser.email });

      return { success: true };
    } catch {
      return { success: false, message: "Сақтау кезінде қате шықты!" };
    }
  }

  async function login(
    email: string,
    password: string
  ): Promise<Result> {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      (item) =>
        item.email === normalizedEmail &&
        item.password === password
    );

    if (!existingUser) {
      return {
        success: false,
        message: "Email немесе құпиясөз қате!",
      };
    }

    try {
      await AsyncStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ email: normalizedEmail })
      );

      setUser({
        name: existingUser.name,
        email: existingUser.email,
      });

      return { success: true };
    } catch {
      return { success: false, message: "Кіру кезінде қате шықты!" };
    }
  }

  async function resetPassword(
    email: string,
    newPassword: string
  ): Promise<Result> {
    const normalizedEmail = email.trim().toLowerCase();

    if (newPassword.length < 6) {
      return {
        success: false,
        message: "Құпиясөз кемінде 6 таңбадан тұруы керек!",
      };
    }

    if (!users.some((item) => item.email === normalizedEmail)) {
      return {
        success: false,
        message: "Мұндай пайдаланушы табылмады!",
      };
    }

    const updatedUsers = users.map((item) =>
      item.email === normalizedEmail
        ? { ...item, password: newPassword }
        : item
    );

    try {
      await AsyncStorage.setItem(
        USERS_KEY,
        JSON.stringify(updatedUsers)
      );

      setUsers(updatedUsers);
      return { success: true };
    } catch {
      return {
        success: false,
        message: "Құпиясөзді өзгерту мүмкін болмады!",
      };
    }
  }

  async function logout(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  async function toggleFavorite(carId: string | number): Promise<void> {
    const id = String(carId);

    const updated = favorites.includes(id)
      ? favorites.filter((item) => item !== id)
      : [...favorites, id];

    setFavorites(updated);

    try {
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updated)
      );
    } catch (error) {
      console.log("Favorites error:", error);
    }
  }

  function isFavorite(carId: string | number): boolean {
    return favorites.includes(String(carId));
  }

  async function updateProfile(newName: string): Promise<Result> {
    if (!user || !newName.trim()) {
      return { success: false, message: "Атыңды енгіз!" };
    }

    const updatedUsers = users.map((item) =>
      item.email === user.email
        ? { ...item, name: newName.trim() }
        : item
    );

    try {
      await AsyncStorage.setItem(
        USERS_KEY,
        JSON.stringify(updatedUsers)
      );

      setUsers(updatedUsers);
      setUser({ ...user, name: newName.trim() });

      return { success: true };
    } catch {
      return { success: false, message: "Сақтау қатесі!" };
    }
  }

  return (
    <AppContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        resetPassword,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
