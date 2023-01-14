import { PrismaClient } from "@prisma/client"
import { serverEnv } from "~/env/server"

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined
}

export const prisma =
	globalThis.prisma ||
	new PrismaClient({
		log:
			serverEnv.NODE_ENV === "development"
				? ["query", "error", "warn"]
				: ["error"],
	})

if (serverEnv.NODE_ENV !== "production") {
	globalThis.prisma = prisma
}
