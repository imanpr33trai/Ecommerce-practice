import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { AugmentedSession, Context } from "./context";

export const t = initTRPC.context<Context>().create({
  transformer: superjson,

});

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user || !ctx.session.user.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
      cause: "No session",
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session as AugmentedSession & {
        user: Exclude<AugmentedSession['user'], null>
      }
    },
  });
});

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.role !== 'ADMIN') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Admin Access Required',
      cause: 'User is not an admin'
    })
  }
  return next({ ctx })
})
