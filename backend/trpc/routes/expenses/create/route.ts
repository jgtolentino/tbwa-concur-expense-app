import { z } from "zod";
import { protectedProcedure } from "../../../create-context";

const createExpenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
  category: z.string(),
  date: z.string(),
  receiptUrl: z.string().optional(),
});

export const createExpenseProcedure = protectedProcedure
  .input(createExpenseSchema)
  .mutation(async ({ input }) => {
    // In a real app, you would save to database here
    const expense = {
      id: Date.now().toString(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    
    return {
      success: true,
      expense,
    };
  });