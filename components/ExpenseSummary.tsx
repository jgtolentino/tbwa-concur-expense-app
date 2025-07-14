import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useExpenseStore } from "@/store/expenseStore";
import { colors } from "@/constants/colors";

export default function ExpenseSummary() {
  const { getTotalExpenses, getMonthlyTotals } = useExpenseStore();
  
  const totalExpenses = getTotalExpenses();
  const monthlyTotals = getMonthlyTotals(2);
  const currentMonth = monthlyTotals[0] || { month: "", total: 0 };
  const previousMonth = monthlyTotals[1] || { month: "", total: 0 };
  
  const percentChange = previousMonth.total
    ? ((currentMonth.total - previousMonth.total) / previousMonth.total) * 100
    : 0;
  
  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Expenses</Text>
        <Text style={styles.totalAmount}>${totalExpenses.toFixed(2)}</Text>
      </View>
      
      <View style={styles.monthlyContainer}>
        <View style={styles.monthContainer}>
          <Text style={styles.monthLabel}>This Month</Text>
          <Text style={styles.monthAmount}>
            ${currentMonth.total.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.monthContainer}>
          <Text style={styles.monthLabel}>Last Month</Text>
          <Text style={styles.monthAmount}>
            ${previousMonth.total.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.changeContainer}>
          <Text style={styles.changeLabel}>Change</Text>
          <Text
            style={[
              styles.changeAmount,
              {
                color:
                  percentChange > 0
                    ? colors.danger
                    : percentChange < 0
                    ? colors.success
                    : colors.textSecondary,
              },
            ]}
          >
            {percentChange > 0 ? "+" : ""}
            {percentChange.toFixed(1)}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  totalContainer: {
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },
  monthlyContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthContainer: {
    flex: 1,
  },
  monthLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  monthAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  changeContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  changeLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  changeAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
});