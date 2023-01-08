import type { Session } from "@auth/core/types"
import { getSession } from "@auth/solid-start"
import type { Component } from "solid-js"
import { Show, createEffect } from "solid-js"
import { useNavigate, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { authOpts } from "../routes/api/auth/[...solidauth]"

export function protectedRoute(Page: Component<{ session: Session }>) {
	const routeData = () => {
		return createServerData$(async (_, { request }) => {
			return await getSession(request, authOpts)
		})
	}

	const Dash: Component = () => {
		const session = useRouteData<typeof routeData>()
		const navigate = useNavigate()

		createEffect(() => {
			const ses = session()
			if (!session.loading) {
				if (!ses?.user) {
					navigate("/auth/login")
				}
			}
		})

		return (
			<>
				<Show
					when={session.loading}
					fallback={
						<Show when={session()?.user}>
							<Page session={session() as Session} />
						</Show>
					}
                ><></></Show>
			</>
		)
	}

	return [routeData, Dash]
}
