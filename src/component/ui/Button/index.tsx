import type { Component } from "solid-js"
import { Button as KButton } from "@kobalte/core"
import "./button.css"

export const Button: Component<
	{
		variant?: "text" | "contained" | "outlined"
		round?: boolean
	} & Parameters<typeof KButton>[0]
> = (props) => {
	return (
		<>
			<KButton
				{...props}
				classList={{
					[props.variant || "outlined"]: true,
					round: props.round || false,
					...props.classList,
				}}
			>
				{props.children}
			</KButton>
		</>
	)
}
