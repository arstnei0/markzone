import { createSignal } from "solid-js"

export type GTheme = "l" | "d"
export const [gtheme, _setGtheme] = createSignal(
	((globalThis as any).gtheme || "l") as GTheme
)
export const setGtheme = (t: GTheme) => {
	const prev = gtheme()
	document.documentElement.classList.remove(prev)
	_setGtheme(t)
	document.documentElement.classList.add(t)
	localStorage.setItem("m", t)
}

export const toggleGtheme = () => {
	if (gtheme() === "l") setGtheme("d")
	else if (gtheme() === "d") setGtheme("l")
}
