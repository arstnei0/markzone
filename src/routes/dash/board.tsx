import { getSession } from "@auth/solid-start"
import type { Component } from "solid-js"
import { Show } from "solid-js"
import { useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { Dashboard } from "~/component/Dashboard"
import { authOpts } from "../api/auth/[...solidauth]"

export const routeData = () => {
	return createServerData$(async (_, { request }) => {
		return await getSession(request, authOpts)
	})
}

const DashboardPage: Component = () => {
	const session = useRouteData<typeof routeData>()

	return (
		<>
			<Show
				when={session.loading}
				fallback={
					<Show when={session()?.user} fallback={<></>}>
						<Dashboard user={session()?.user} />
					</Show>
				}
			>
				<></>
			</Show>
		</>
	)
}

export default DashboardPage
