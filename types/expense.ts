export type ExpenseCategory = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Expense = {
  id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
  receiptUrl?: string;
};

export type MonthlyTotal = {
  month: string;
  total: number;
};

export type CategoryTotal = {
  category: string;
  total: number;
  color: string;
};