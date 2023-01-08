import { type VoidComponent, Switch, Match } from "solid-js"
import { Title, useRouteData } from "solid-start"
import { trpc } from "~/utils/trpc"
import { createServerData$ } from "solid-start/server"
import { getSession } from "@auth/solid-start"
import { authOpts } from "./api/auth/[...solidauth]"
import { signIn, signOut } from "@auth/solid-start/client"

export const routeData = () => {
	return createServerData$(async (_, { request }) => {
		return await getSession(request, authOpts)
	})
}

const Home: VoidComponent = () => {
	const session = useRouteData<typeof routeData>()
	const res = trpc.secret.useQuery(undefined, {
		get enabled() {
			return !!session()?.user
		},
	})

	return (
		<>
			<Title>Create JD App</Title>
			<div>
				<Switch
					fallback={<pre>{JSON.stringify(res.data, null, 2)}</pre>}
				>
					<Match when={res.isLoading}>
						<div>
							{" "}
							{res.isFetching ? "Loading" : "Not Logged In"}
						</div>
					</Match>
				</Switch>
				<Switch
					fallback={
						<button onClick={() => signIn("github")}>Login</button>
					}
				>
					<Match when={session.loading}>
						<h1>Loading session</h1>
					</Match>
					<Match when={session()}>
						<button onClick={() => signOut()}>Logout</button>
					</Match>
				</Switch>
			</div>
		</>
	)
}

export default Home
