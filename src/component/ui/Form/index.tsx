import type { Component, JSX } from "solid-js"
import "./form.css"

export const Form: Component<{ children: JSX.Element }> = (props) => {
	return <div class="form">{props.children}</div>
}

export const FormItem: Component<{ children: JSX.Element }> = (props) => {
	return (
		<>
			{props.children}
			<br />
		</>
	)
}
