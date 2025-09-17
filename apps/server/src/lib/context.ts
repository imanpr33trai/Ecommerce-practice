import type { Context as HonoContext } from "hono";
import { auth } from "./auth";
// 💡 Corrected Prisma import path - typically 'prisma' is at the root of the server app,
// or imported from a utility file that exports the client.
// Assuming your 'prisma' client is exported from `apps/server/prisma/index.ts`
import prisma from "prisma";
import { UserRole } from "@generated/enums"; // Import UserRole from Prisma client directly


export type CreateContextOptions = {
  context: HonoContext;
};

// Original session user type (what better-auth.api.getSession returns for a user)
export interface OriginalSessionUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}

// Augmented session type (what our tRPC context will actually contain)
export interface AugmentedSession {
  user: (OriginalSessionUser & { role: UserRole }) | null;
  // Add other top-level properties from your better-auth session if needed
  // e.g., expires?: string;
}

export async function createContext({ context }: CreateContextOptions) {
  const rawSession = await auth.api.getSession({
    headers: context.req.raw.headers,
  });

  let session: AugmentedSession = { user: null }; // Initialize with null user

  // -------------------------------------------------------------------------
  // THE FIX IS HERE 👇
  // Perform a robust check that rawSession and rawSession.user are non-null
  // -------------------------------------------------------------------------
  if (rawSession?.user && rawSession.user.id) { // Check for both rawSession and rawSession.user
    const userFromDb = await prisma.user.findUnique({
      where: { id: rawSession.user.id },
      select: {
        id: true, // Ensure ID is selected
        role: true,
        name: true,
        email: true,
        image: true,
      },
    });

    // If a user is found in the database, then augment the session
    if (userFromDb) {
      session.user = {
        id: userFromDb.id,
        email: userFromDb.email,
        name: userFromDb.name,
        image: userFromDb.image,
        role: userFromDb.role, // Attach the role from DB
      };
    }
  }

  return {
    session,
    prisma, // Make prisma available in tRPC context
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;