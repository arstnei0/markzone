import type { Component, JSX } from "solid-js"
import "./shadow.css"

export const Shadow: Component<JSX.HTMLAttributes<HTMLDivElement>> = (
	props
) => {
	return (
		<div class="shadow" {...props}>
			{props.children}
		</div>
	)
}
