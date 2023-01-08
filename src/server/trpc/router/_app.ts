import { t } from "../utils"
import pageRouter from "./page"

export const appRouter = t.router({
	page: pageRouter,
})

export type IAppRouter = typeof appRouter
