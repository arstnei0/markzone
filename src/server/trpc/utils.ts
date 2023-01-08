import type { Session } from "@auth/core/types"
import { initTRPC, TRPCError } from "@trpc/server"
import type { IContext } from "./context"

export const t = initTRPC.context<IContext>().create()

export const router = t.router
export const procedure = t.procedure
export const protectedProcedure = t.procedure.use(
	t.middleware(async ({ ctx, next }) => {
		if (!ctx.session || !ctx.session.user) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "You are not authorized to access this resource",
			})
		}
		return next({
			ctx: {
				...ctx,
				session: { ...ctx.session, user: ctx.session.user },
			},
		})
	})
)

export async function getUserIdFromSession(session: Session) {
	if (!session.user || !session.user.email) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "User not authenticated!",
		})
	}

	const userId = await prisma?.user.findUnique({
		where: {
			email: session.user?.email,
		},
		select: {
			id: true,
		},
	})

	if (userId) return userId.id
	throw new TRPCError({
		code: "UNAUTHORIZED",
		message: "User not found!",
	})
}
