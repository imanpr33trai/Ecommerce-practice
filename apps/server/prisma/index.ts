import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient({
    errorFormat: 'pretty'
});

export default prisma;
