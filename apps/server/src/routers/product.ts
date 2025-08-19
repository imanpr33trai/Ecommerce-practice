import { publicProcedure, router } from "@/lib/trpc";
import prisma from "../../prisma";
export const productRouter = router({
    getAll: publicProcedure.query(async () => {
        return await prisma.product.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                reviews: {
                    select: {
                        rating: true,
                        comment: true,
                        user: {
                            select: {
                                name: true,
                                image: true
                            }
                        }
                    }
                },
                images: {
                    select: {
                        url: true,
                        altText: true,
                    }
                }
            }
        })
    })
})