import type { Session } from "@auth/core/types"
import type { Component } from "solid-js"
import { createSignal, onMount, Show } from "solid-js"
import { protectedRoute } from "./session"
import type { RouteDataFunc } from "solid-start"
import { isServer } from "solid-js/web"
import { Button } from "~/component/ui/Button"
import { gtheme, toggleGtheme } from "~/lib/gtheme"
import '~/styles/dashboard.css'

export function withDash(
	Page: Component<{ session: Session }>
): [RouteDataFunc, Component] {
	return protectedRoute((props) => {
		const [m, setM] = createSignal(false)
		onMount(() => {
			setM(true)
		})

		if (isServer)
			// eslint-disable-next-line solid/components-return-once
			return (
				<div class="dashboard">
					<div class="dashboard-header">
						<a href="/dashboard">
							<h1>Dashboard</h1>
						</a>
						<div />
					</div>
					<Page session={props.session} />
				</div>
			)

		return (
			<div class="dashboard">
				<div class="dashboard-header">
					<a href="/dashboard">
						<h1>Dashboard</h1>
					</a>
					<div>
						<Show when={m()}>
							<Button
								round
								variant="text"
								onPress={() => {
									toggleGtheme()
								}}
							>
								<Show
									when={gtheme() === "l"}
									fallback={
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="1em"
											height="1em"
											viewBox="0 0 24 24"
										>
											<path
												fill="currentColor"
												d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56z"
											/>
										</svg>
									}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="1em"
										height="1em"
										viewBox="0 0 24 24"
									>
										<path
											fill="currentColor"
											d="M12 5q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm4.95 2.05q-.275-.275-.275-.688q0-.412.275-.712l1.4-1.425q.3-.3.712-.3q.413 0 .713.3q.275.275.275.7q0 .425-.275.7L18.35 7.05q-.275.275-.7.275q-.425 0-.7-.275ZM20 13q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287q.288.288.288.713t-.288.712Q22.425 13 22 13Zm-8 10q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05l-1.425-1.4q-.3-.3-.3-.725t.3-.7q.275-.275.7-.275q.425 0 .7.275L7.05 5.65q.275.275.275.7q0 .425-.275.7q-.3.275-.7.275q-.4 0-.7-.275Zm12.7 12.725l-1.4-1.425q-.275-.3-.275-.712q0-.413.275-.688q.275-.275.688-.275q.412 0 .712.275l1.425 1.4q.3.275.287.7q-.012.425-.287.725q-.3.3-.725.3t-.7-.3ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm2.225 6.775q-.275-.275-.275-.7q0-.425.275-.7L5.65 16.95q.275-.275.688-.275q.412 0 .712.275q.3.3.3.713q0 .412-.3.712l-1.4 1.4q-.3.3-.725.3t-.7-.3ZM12 18q-2.5 0-4.25-1.75T6 12q0-2.5 1.75-4.25T12 6q2.5 0 4.25 1.75T18 12q0 2.5-1.75 4.25T12 18Z"
										/>
									</svg>
								</Show>
							</Button>
						</Show>
					</div>
				</div>
				<Page session={props.session} />
			</div>
		)
	})
}
