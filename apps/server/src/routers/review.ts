import { publicProcedure, router } from "@/lib/trpc";
import prisma from "prisma";
import z from "zod";

export const ReviewRouter = router({
    productReview: publicProcedure.input(
        z.object({ productId: z.string() })
    ).query(async ({ input }) => {
        return await prisma.review.findMany({
            where: { productId: input.productId },
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        })

    }),
    addReview: publicProcedure.input(
        z.object({
            productId: z.string().cuid(),
            rating: z.number().int().min(1).max(5),
            comment: z.string().min(5).max(100)
            , productSlug: z.string()
        })
    ).mutation(async ({ ctx, input }) => {
        const { comment, productId, rating } = input;
        const userId = ctx.session?.user.id

        if (!userId) {
            throw new Error("User must be logged in to add a review.");
        }

        const newReview = await prisma.review.create({
            data: {
                productId
                , userId,
                rating,
                comment
            }
        })
    })
})