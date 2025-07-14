import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { Receipt } from "lucide-react-native";

type EmptyStateProps = {
  title?: string;
  message?: string;
};

export default function EmptyState({
  title = "No expenses yet",
  message = "Start tracking your expenses by adding your first one.",
}: EmptyStateProps) {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Receipt size={48} color={colors.gray[400]} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push("/expense/new")}
      >
        <Text style={styles.buttonText}>Add Expense</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray[200],
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});