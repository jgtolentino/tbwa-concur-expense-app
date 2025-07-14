import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useExpenseStore } from "@/store/expenseStore";
import ExpenseCard from "@/components/ExpenseCard";
import EmptyState from "@/components/EmptyState";
import { colors } from "@/constants/colors";
import { Plus, Search } from "lucide-react-native";

export default function ExpensesScreen() {
  const router = useRouter();
  const { expenses } = useExpenseStore();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={colors.gray[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search expenses..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={colors.gray[500]}
        />
      </View>
      
      {filteredExpenses.length > 0 ? (
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExpenseCard expense={item} />}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState
          title={searchQuery ? "No matching expenses" : "No expenses yet"}
          message={
            searchQuery
              ? "Try a different search term"
              : "Start tracking your expenses by adding your first one."
          }
        />
      )}
      
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: colors.text,
  },
  listContent: {
    paddingBottom: 80,
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