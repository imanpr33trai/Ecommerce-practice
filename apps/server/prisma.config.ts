import "dotenv/config";
import path from "node:path";

// Define the PrismaConfig interface
interface PrismaConfig {
  schema: string;
  migrations: {
    path: string;
  };
}

export default {
  schema: path.join("prisma", "schema"),
  migrations: {
    path: path.join("prisma", "migrations"),
  }
} satisfies PrismaConfig;
