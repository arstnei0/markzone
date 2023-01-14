import type { Session } from "@auth/core/types"
import type { Component } from "solid-js"
import { protectedRoute } from "./session"
import type { RouteDataFunc } from "solid-start"

export function withDash(
	Page: Component<{ session: Session }>
): [RouteDataFunc, Component] {
	return protectedRoute((props) => {
		return (
			<>
				<Page session={props.session} />
			</>
		)
	})
}
