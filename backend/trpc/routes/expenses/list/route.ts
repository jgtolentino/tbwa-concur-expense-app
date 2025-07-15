import { z } from "zod";
import { protectedProcedure } from "../../../create-context";

export const listExpensesProcedure = protectedProcedure
  .input(z.object({
    limit: z.number().optional().default(10),
    offset: z.number().optional().default(0),
  }))
  .query(async ({ input }) => {
    // In a real app, you would fetch from database here
    const mockExpenses = [
      {
        id: "1",
        amount: 25.50,
        description: "Team lunch",
        category: "food",
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      {
        id: "2", 
        amount: 15.00,
        description: "Coffee meeting",
        category: "food",
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
    ];
    
    return {
      expenses: mockExpenses.slice(input.offset, input.offset + input.limit),
      total: mockExpenses.length,
    };
  });