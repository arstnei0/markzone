import { z } from "zod"
import {
	procedure,
	router,
	protectedProcedure,
	getUserIdFromSession,
} from "../utils"
import { prisma } from "../../db/client"
import { TRPCError } from "@trpc/server"
import { ThemeName } from "~/theme/theme"
import { transformMarkdown } from "~/lib/markdown"

export default router({
	new: protectedProcedure
		.input(
			z.object({
				content: z.string(),
				title: z.string(),
                theme: ThemeName,
			})
		)
		.mutation(async ({ ctx, input }) => {
			const userId = await getUserIdFromSession(ctx.session)

			return await prisma.page.create({
				data: {
					content: input.content,
					title: input.title,
                    theme: input.theme,
                    transformed: await transformMarkdown(input.content, input.theme),
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
        
        return page
	}),
})
