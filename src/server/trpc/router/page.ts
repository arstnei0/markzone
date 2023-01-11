import { z } from "zod"
import {
	procedure,
	router,
	protectedProcedure,
	getUserIdFromSession,
} from "../utils"
import dayjs from 'dayjs'
import { prisma } from "../../db/client"
import { TRPCError } from "@trpc/server"
import { Theme, ThemeName } from "~/theme/theme"
import { transformMarkdown } from "~/lib/markdown"
import { transformedStore } from "~/lib/transformed"
import { themes } from "~/theme/themes"

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
					content: Buffer.from(input.content),
					title: input.title,
                    theme: input.theme,
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
	view: procedure.input(z.number()).query(async ({ input }) => {
		const page = await prisma.page.findUnique({
			where: {
				id: input,
			},
            select: {
                title: true,
                userId: true,
                theme: true,
                createdAt: true,
                updatedAt: true,
            }
		})

        if (!page) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Page not found!"
            })
        }

        const inputString = input.toString()

        let content: string = await transformedStore.get(inputString)
        if (!content) {
            const pageContent = (await prisma.page.findUnique({
                where: {id: input},
                select: {content: true}
            }))?.content.toString() || ''

            const transformed = await transformMarkdown(pageContent, page.theme as ThemeName)

            await transformedStore.set(inputString, transformed)
            content = transformed
        }

        const theme = Reflect.get(themes, page.theme) as Theme
        
        return {
            title: page.title,
            userId: page.userId,
            content: content,
            theme: theme,
            createdAt: dayjs(page.createdAt).format('D MMM, YYYY'),
            updatedAt: dayjs(page.updatedAt).format('D MMM, YYYY'),
        }
	}),
})
