import { publicProcedure, router } from "@/lib/trpc";
import { TRPCError } from "@trpc/server";
import { type CartWithItems } from '@/lib/types'
import prisma from "prisma";

import z from "zod";

export const cartRouter = router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const userId = ctx.session?.user.id;
        if (!userId) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You must be logged in to view the cart'
            });
        }
        const cart = await prisma.cart.findFirst({
            where: { userId },
            include: {
                items: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                images: { where: { isPrimary: true }, take: 1 },
                                slug: true,
                            }
                        }
                    }
                }
            }
        })
        if (!cart) {
            const empty: CartWithItems = {
                id: null as any,
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
                items: [],
            }
            return empty
        }
        return cart
    }),
    addToCart: publicProcedure.input(z.object({
        productId: z.string(),
        quantity: z.number().min(1),
        userId: z.string()

    })).mutation(async ({ ctx, input }) => {
        const userId = ctx.session?.user.id
        if (!userId) {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: 'You must be logged in to add items to the cart'

            })
        }
        const cart = await prisma.cart.upsert({
            where: { userId, id: input.productId },
            create: { userId },
            update: {}
        })

        return await prisma.cartItem.upsert({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: input.productId
                }
            },
            update: { quantity: { increment: input.quantity } },
            create: { cartId: cart.id, productId: input.productId, quantity: input.quantity }
            , include: {
                product: true
            }
        })
    }),
    removeFromCart: publicProcedure.input(z.object({
        id: z.string()
    })).mutation(async ({ ctx, input }) => {
        if (!ctx.session?.user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You must be logged in to remove an item from the cart"
            });
        }
        try {
            return await prisma.cartItem.delete({
                where: {
                    id: input.id
                },
                include: {
                    product: true
                }
            })
        } catch (error) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Cart item not found"
            })
        }
    }),
    updateQuantity: publicProcedure.input(z.object({
        productId: z.string(),
        quantity: z.number().min(1)
    })).mutation(async ({ ctx, input }) => {
        if (!ctx.session?.user) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You must be logged in to update the cart item quantity"
            })
        }
        const cartItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: ctx.session.user.id,
                    productId: input.productId
                }
            },
            include: {
                product: true
            }


        })
        if (!cartItem) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Cart item not found"
            })
        }
        if (input.quantity < 1) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Quantity must be at least 1"
            })
        }
        return await prisma.cartItem.update({
            where: {
                id: cartItem.id,

            },
            data: {
                quantity: input.quantity
            },
            include: {
                product: true
            }

        })
    })

})