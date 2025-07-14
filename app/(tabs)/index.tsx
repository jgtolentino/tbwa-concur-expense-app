import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useExpenseStore } from "@/store/expenseStore";
import ExpenseSummary from "@/components/ExpenseSummary";
import ExpenseCard from "@/components/ExpenseCard";
import EmptyState from "@/components/EmptyState";
import { colors } from "@/constants/colors";
import { Plus } from "lucide-react-native";

export default function DashboardScreen() {
  const router = useRouter();
  const { expenses } = useExpenseStore();
  const recentExpenses = expenses.slice(0, 5);
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ExpenseSummary />
        
        <View style={styles.recentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <Pressable onPress={() => router.push("/expenses")}>
              <Text style={styles.viewAllText}>View All</Text>
            </Pressable>
          </View>
          
          {recentExpenses.length > 0 ? (
            recentExpenses.map((expense) => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))
          ) : (
            <EmptyState />
          )}
        </View>
      </ScrollView>
      
      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/expense/new")}
      >
        <Plus color="white" size={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  recentContainer: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});