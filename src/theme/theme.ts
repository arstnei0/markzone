import { z } from "zod"

export const themeNames = ["default", "zihan"] as const
export const ThemeName = z.enum(themeNames).default("default")
export type ThemeName = z.infer<typeof ThemeName>

export const Theme = z.object({
	shiki: z.object({
		theme: z.string().default("one-dark-pro"),
	}),
	name: z.string(),
    css: z.object({
        files: z.array(z.string()).default([])
    }),
})
export type Theme = z.infer<typeof Theme>
export type ThemeI = z.input<typeof Theme>
