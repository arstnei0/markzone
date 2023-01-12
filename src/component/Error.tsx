import type { Component } from "solid-js"
import "./Error.css"

export const Error: Component = () => {
	return (
		<>
			<div class="error">
				<h1 style={{ color: "red" }}>An error just occurred!</h1>
				<p>Sorry for the inconvenience caused.</p>
			</div>
		</>
	)
}
