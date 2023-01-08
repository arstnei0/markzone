import { ThemeName, Theme } from "./theme"

const themeFiles = await Promise.all(
	Object.values(import.meta.glob("./themes/*/index.ts")).map((imp) => imp())
)

export const themes: Record<ThemeName, Theme> = themeFiles
	.map((themeExports: any) => themeExports.default)
	.reduce(
		(themes: any, theme: any) => ({ ...themes, [theme.name]: theme }),
		{}
	) as any
