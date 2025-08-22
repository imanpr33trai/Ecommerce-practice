import {
  protectedProcedure, publicProcedure,
  router,
} from "../lib/trpc";
import { cartRouter } from "./cart";
import { productRouter } from "./product";
import { todoRouter } from "./todo";
import { wishRouter } from "./wish";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  todo: todoRouter,
  product: productRouter,
  wish: wishRouter,
  cart: cartRouter
});
export type AppRouter = typeof appRouter;
