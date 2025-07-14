import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Expense, MonthlyTotal, CategoryTotal } from "@/types/expense";
import { categories } from "@/constants/categories";

interface ExpenseState {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  getExpenseById: (id: string) => Expense | undefined;
  getTotalExpenses: () => number;
  getMonthlyTotals: (months?: number) => MonthlyTotal[];
  getCategoryTotals: () => CategoryTotal[];
}

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],
      
      addExpense: (expense) => {
        const newExpense = {
          ...expense,
          id: Date.now().toString(),
        };
        set((state) => ({
          expenses: [newExpense, ...state.expenses],
        }));
      },
      
      updateExpense: (id, updatedExpense) => {
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id ? { ...expense, ...updatedExpense } : expense
          ),
        }));
      },
      
      deleteExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        }));
      },
      
      getExpenseById: (id) => {
        return get().expenses.find((expense) => expense.id === id);
      },
      
      getTotalExpenses: () => {
        return get().expenses.reduce((total, expense) => total + expense.amount, 0);
      },
      
      getMonthlyTotals: (months = 6) => {
        const today = new Date();
        const monthlyTotals: Record<string, number> = {};
        
        // Initialize last n months with zero values
        for (let i = 0; i < months; i++) {
          const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const monthYear = date.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
          monthlyTotals[monthYear] = 0;
        }
        
        // Sum expenses by month
        get().expenses.forEach((expense) => {
          const expenseDate = new Date(expense.date);
          const monthYear = expenseDate.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
          
          if (monthlyTotals[monthYear] !== undefined) {
            monthlyTotals[monthYear] += expense.amount;
          }
        });
        
        // Convert to array and sort by date (newest first)
        return Object.entries(monthlyTotals)
          .map(([month, total]) => ({ month, total }))
          .reverse();
      },
      
      getCategoryTotals: () => {
        const categoryTotals: Record<string, number> = {};
        
        // Initialize categories with zero values
        categories.forEach((category) => {
          categoryTotals[category.id] = 0;
        });
        
        // Sum expenses by category
        get().expenses.forEach((expense) => {
          categoryTotals[expense.category] += expense.amount;
        });
        
        // Convert to array and add color information
        return Object.entries(categoryTotals)
          .map(([category, total]) => ({
            category,
            total,
            color: categories.find((c) => c.id === category)?.color || "#A0AEC0",
          }))
          .filter((item) => item.total > 0)
          .sort((a, b) => b.total - a.total);
      },
    }),
    {
      name: "expense-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);