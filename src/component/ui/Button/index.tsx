import type { Component, JSX } from "solid-js"
import { Button as KButton } from "@kobalte/core"
import "./index.css"

export const Button: Component<
	{
		variant?: "text" | "contained" | "outlined"
		round?: boolean
	} & JSX.HTMLAttributes<HTMLButtonElement>
> = (props) => {
	return (
		<>
			<KButton
				classList={{
					[props.variant || "outlined"]: true,
					round: props.round || false,
				}}
				{...props}
			>
				{props.children}
			</KButton>
		</>
	)
}
