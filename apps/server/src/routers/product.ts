import { publicProcedure, router } from "@/lib/trpc";
import prisma from "../../prisma";
export const productRouter = router({
    getNewDeal: publicProcedure.query(async () => {
        return await prisma.product.findFirst({
            where: {
                tags: {
                    has: "newDeal"
                }
            },
            include: {
                reviews: {
                    select: {
                        rating: true,
                    }
                },

                category: {
                    select: {
                        name: true
                    }
                },
                images: {
                    select: {
                        altText: true,
                        url: true

                    }
                }
            }
        })
    }),
    getExclusiveDeal: publicProcedure.query(async () => {
        return await prisma.product.findFirst({
            where:
            {
                tags: { has: "exclusive" }
            },
            include: {
                reviews: {
                    select: {
                        rating: true,
                    }
                },

                category: {
                    select: {
                        name: true
                    }
                },
                images: {
                    select: {
                        altText: true,
                        url: true

                    }
                }
            }
        })
    })
})