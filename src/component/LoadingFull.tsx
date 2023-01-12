import type { Component } from "solid-js"
import { Loading } from "./Loading"
import "./LoadingFull.css"

export const LoadingFull: Component = () => {
	return (
		<div class="center">
            <div class="centerd"><Loading /></div>
		</div>
	)
}
