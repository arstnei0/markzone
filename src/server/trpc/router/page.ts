import { z } from "zod"
import {
	procedure,
	router,
	protectedProcedure,
	getUserIdFromSession,
} from "../utils"
import { prisma } from "../../db/client"
import { transformMarkdown } from "~/lib/markdown"
import { TRPCError } from "@trpc/server"

export default router({
	new: protectedProcedure
		.input(
			z.object({
				content: z.string(),
				title: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const userId = await getUserIdFromSession(ctx.session)

			return prisma.page.create({
				data: {
					content: input.content,
					title: input.title,
					userId,
				},
			})
		}),
	all: protectedProcedure.query(async ({ ctx }) => {
		return prisma.page.findMany({
			where: {
				userId: await getUserIdFromSession(ctx.session),
			},
		})
	}),
	public: procedure.input(z.number()).query(async ({ input }) => {
		const page = await prisma.page.findUnique({
			where: {
				id: input,
			},
		})

        if (!page) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Page not found!"
            })
        }
        
        page.content = await transformMarkdown(page.content)

        return page
	}),
})
