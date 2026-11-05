import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "./theme";

export default function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  icon = "person-outline",
  autoCapitalize = "none",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputBox}>
        <Ionicons name={icon} size={21} color={COLORS.primary} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !visible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Ionicons
              name={visible ? "eye-off-outline" : "eye-outline"}
              size={21}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    height: 58,
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 15,
    marginLeft: 12,
    outlineStyle: "none",
  },
});
