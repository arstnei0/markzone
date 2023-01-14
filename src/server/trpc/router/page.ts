import { z } from "zod"
import {
	procedure,
	router,
	protectedProcedure,
	getUserIdFromSession,
} from "../utils"
import dayjs from "dayjs"
import { prisma } from "../../db/client"
import { TRPCError } from "@trpc/server"
import type { Theme } from "~/theme/theme"
import { ThemeName } from "~/theme/theme"
import { transformMarkdown } from "~/lib/markdown"
import { contentStore } from "~/lib/store"
import { themes } from "~/theme/themes"
import { PageType } from "@prisma/client"

export default router({
	new: protectedProcedure
		.input(
			z.object({
				content: z.string(),
				title: z.string(),
				theme: ThemeName,
				type: z.nativeEnum(PageType).default(PageType.Markdown),
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
					type: input.type,
				},
			})
		}),
	delete: protectedProcedure
		.input(z.number())
		.mutation(async ({ input, ctx }) => {
            const userId = await getUserIdFromSession(ctx.session)
            if ((await prisma.page.findUnique({ where: {id: input}, select: {userId: true}}))?.userId !== userId) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have access to this page!"
                })
            }

			return await prisma.page.delete({
				where: {
                    id: input,
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
			},
		})

		if (!page) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Page not found!",
			})
		}

		const inputString = input.toString()

		let content: string = await contentStore.get(inputString)
		if (!content) {
			const pageWC = await prisma.page.findUnique({
				where: { id: input },
				select: { content: true, type: true },
			})
			const pageContent = pageWC?.content.toString() || ""
			let transformed: string = pageContent

			if (pageWC?.type === PageType.Markdown) {
				transformed = await transformMarkdown(
					pageContent,
					page.theme as ThemeName
				)
			}

			await contentStore.set(inputString, transformed)
			content = transformed
		}

		const theme = Reflect.get(themes, page.theme) as Theme

		return {
			title: page.title,
			userId: page.userId,
			content: content,
			theme: theme,
			createdAt: dayjs(page.createdAt).format("D MMM, YYYY"),
			updatedAt: dayjs(page.updatedAt).format("D MMM, YYYY"),
		}
	}),
})
