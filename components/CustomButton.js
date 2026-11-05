import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { COLORS } from "./theme";

export default function CustomButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, style, (loading || disabled) && styles.disabled]}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    minHeight: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
  },
  disabled: {
    opacity: 0.5,
  },
});
