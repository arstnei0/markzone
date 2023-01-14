import type { DefaultSession } from "@auth/core/types"
import type { Component } from "solid-js"
import { useNavigate } from "solid-start"
import { Pages } from "./Pages"
import { Button } from "../ui/Button"
import "./Dashboard.css"

export const Dashboard: Component<{ user: DefaultSession["user"] }> = () => {
	const navigate = useNavigate()

	return (
		<>
			<div id="dashboard-home">
				<div id="page-list-header">
					<h2>Pages</h2>
					<Button
						variant="contained"
						onClick={() => {
							navigate("/page/new")
						}}
						round
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
							/>
						</svg>
					</Button>
				</div>
				<Pages />
			</div>
		</>
	)
}
