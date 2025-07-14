import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { format } from "date-fns";
import { categories } from "@/constants/categories";
import { Expense } from "@/types/expense";
import { colors } from "@/constants/colors";
import { LucideIcon } from "lucide-react-native";

type ExpenseCardProps = {
  expense: Expense;
};

export default function ExpenseCard({ expense }: ExpenseCardProps) {
  const router = useRouter();
  const category = categories.find((c) => c.id === expense.category);
  
  const handlePress = () => {
    router.push(`/expense/${expense.id}`);
  };
  
  return (
    <Pressable
      style={styles.container}
      onPress={handlePress}
    >
      <View style={[styles.categoryIcon, { backgroundColor: category?.color }]}>
        {/* We would use the icon here, but we're keeping it simple for now */}
        <Text style={styles.categoryIconText}>
          {category?.name.charAt(0) || "?"}
        </Text>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.description} numberOfLines={1}>
          {expense.description}
        </Text>
        <Text style={styles.categoryName}>{category?.name || "Uncategorized"}</Text>
        <Text style={styles.date}>
          {format(new Date(expense.date), "MMM d, yyyy")}
        </Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>
          ${expense.amount.toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryIconText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: colors.gray[500],
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
});