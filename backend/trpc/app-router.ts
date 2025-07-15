import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import { createExpenseProcedure } from "./routes/expenses/create/route";
import { listExpensesProcedure } from "./routes/expenses/list/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  expenses: createTRPCRouter({
    create: createExpenseProcedure,
    list: listExpensesProcedure,
  }),
});

export type AppRouter = typeof appRouter;