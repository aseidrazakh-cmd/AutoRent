import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext(null);

const USERS_KEY = "@autorent_demo_users";
const SESSION_KEY = "@autorent_session";
const FAVORITES_KEY = "@autorent_favorites";

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const savedUsers = await AsyncStorage.getItem(USERS_KEY);
        const savedSession = await AsyncStorage.getItem(SESSION_KEY);
        const savedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);

        const parsedUsers = savedUsers ? JSON.parse(savedUsers) : [];

        setUsers(parsedUsers);
        setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);

        if (savedSession) {
          const session = JSON.parse(savedSession);
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

    loadData();
  }, []);

  async function register(name, email, password) {
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

    const newUser = {
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

  async function login(email, password) {
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

  async function resetPassword(email, newPassword) {
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

  async function logout() {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  async function toggleFavorite(carId) {
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

  function isFavorite(carId) {
    return favorites.includes(String(carId));
  }

  async function updateProfile(newName) {
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

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }

  return context;
}
