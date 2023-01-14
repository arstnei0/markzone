import type { Component, JSX } from "solid-js"
import { createMemo, splitProps } from "solid-js"
import "./textfield.css"

export const TextField: Component<
	{
		label?: string
		id?: string
		value?: string
	} & JSX.HTMLAttributes<HTMLInputElement>
> = (props) => {
	const [local, other] = splitProps(props, ["id", "label"])
	const id = createMemo(() => local.id || "Input")

	return (
		<>
			<div class="textfield">
				<input placeholder=" " id={id()} {...other} />
				<label for={id()}>{local.label || "input"}</label>
			</div>
		</>
	)
}
