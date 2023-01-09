import type { Session } from "@auth/core/types"
import type { Component } from "solid-js"
import { protectedRoute } from "./session"

export function withDash(Page: Component<{ session: Session }>) {
	return protectedRoute((props) => {
		return (
			<>
				<Page session={props.session} />
			</>
		)
	})
}
