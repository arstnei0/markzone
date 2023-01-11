import { Component, For, JSX } from "solid-js"
import { Shadow } from "../Shadow"
import "./list.css"

export const List: Component<{ children: JSX.Element }> = (props) => {
	return <div class="list">{props.children}</div>
}

export const ListItem: Component<{ children: JSX.Element }> = (props) => {
	return (
		<div class="list-item">
			<Shadow>{props.children}</Shadow>
		</div>
	)
}
