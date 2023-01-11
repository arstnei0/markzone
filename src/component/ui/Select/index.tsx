import type { Component, JSX } from "solid-js"
import "./select.css"

export const Select: Component<
	{ value?: any } & JSX.HTMLAttributes<HTMLSelectElement>
> = (props) => {
	return (
		<>
			<select {...props}>{props.children}</select>
		</>
	)
}
