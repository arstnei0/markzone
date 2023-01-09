import type { Session } from "@auth/core/types"
import { getSession } from "@auth/solid-start"
import type { Component } from "solid-js"
import { Show } from "solid-js"
import { useRouteData } from "solid-start"
import { createServerData$, redirect } from "solid-start/server"
import { authOpts } from "../routes/api/auth/[...solidauth]"

export function protectedRoute(Page: Component<{ session: Session }>) {
	const routeData = () => {
		return createServerData$(
			async (_, { request }) => {
				const session = await getSession(request, authOpts)
				if (!session || !session.user) {
                    throw redirect("/auth/login")
				}
				return session
			},
			{ key: () => "session" }
		)
	}

	const Protected: Component = () => {
		const session = useRouteData<typeof routeData>()

		return (
			<>
				<Show
					when={session.loading}
					fallback={
						<Show when={session()?.user}>
							<Page session={session() as Session} />
						</Show>
					}
				>
					<></>
				</Show>
			</>
		)
	}

	return [routeData, Protected]
}
