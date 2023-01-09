import type { DefaultSession } from "@auth/core/types"
import type { Component } from "solid-js"
import { useNavigate } from "solid-start"
import { Pages } from "./Pages"

export const Dashboard: Component<{ user: DefaultSession["user"] }> = () => {
	const navigate = useNavigate()

	return (
		<>
			<Pages />
			<button
				onClick={() => {
					navigate("/dash/page/new")
				}}
			>
				Create a new page
			</button>
		</>
	)
}
