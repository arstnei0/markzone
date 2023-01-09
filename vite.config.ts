import solid from "solid-start/vite"
import { defineConfig } from "vite"
// @ts-expect-error no typing
import vercel from "solid-start-vercel"
import topLevelAwait from "vite-plugin-top-level-await"

export default defineConfig(() => {
	return {
		plugins: [
			solid({ ssr: true, adapter: vercel({ edge: false }) }),
			topLevelAwait(),
		],
		build: {
			rollupOptions: {},
		},
	}
})
