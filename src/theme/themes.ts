/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ThemeName, Theme } from "./theme"
import dreen from "./themes/dreen"
import _default from "./themes/default"

const themeFiles = [dreen, _default]

export const themes: Record<ThemeName, Theme> = themeFiles.reduce(
	(themes: any, theme: any) => ({ ...themes, [theme.name]: theme }),
	{}
) as any
