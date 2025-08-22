import { publicProcedure, router } from "@/lib/trpc";
import { TRPCError } from "@trpc/server";
import prisma from "prisma";
import z from "zod";

export const wishRouter = router({
    removeWish: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        if (!ctx.session?.user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You must be logged in to remove a wish"
            });
        }
        try {
            return await prisma.wish.delete({
                where: {
                    userId_productId: {
                        productId: input.id,
                        userId: ctx.session?.user.id
                    }

                },
                include: {
                    product: true
                }
            })
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Wish not found"
            })
        }
    }),
    createWish: publicProcedure.input(z.object({
        productId: z.string()
    })).mutation(async ({ ctx, input }) => {
        if (!ctx.session?.user.id) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You must be have a Wished Product"
            })
        }
        return await prisma.wish.upsert({
            where: {
                userId_productId: {
                    productId: input.productId,
                    userId: ctx.session.user.id
                }
            },
            update: {},
            create: {
                userId: ctx.session.user.id,
                productId: input.productId
            }
        })
    }),
    getAll: publicProcedure.query(async () => {
        return await prisma.wish.findMany({
            orderBy: {
                id: "desc"
            },
            include: {
                product: {
                    include: {
                        images: true,
                    }
                }
            }
        })
    })

})