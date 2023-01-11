import { Component, Match, Switch } from "solid-js"
import "./Loading.css"
import "~/styles/var.css"

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Loading: Component = () => {
	const randomInt = getRandomInt(0, 2)

	return (
		<>
			<Switch>
				<Match when={randomInt === 0}>
					<div class="loader">
						<svg viewBox="0 0 80 80">
							<circle id="test" cx="40" cy="40" r="32"></circle>
						</svg>
					</div>
				</Match>
				<Match when={randomInt === 1}>
					<div class="loader triangle">
						<svg viewBox="0 0 86 80">
							<polygon points="43 8 79 72 7 72"></polygon>
						</svg>
					</div>
				</Match>
				<Match when={randomInt === 2}>
					<div class="loader">
						<svg viewBox="0 0 80 80">
							<rect x="8" y="8" width="64" height="64"></rect>
						</svg>
					</div>
				</Match>
			</Switch>
		</>
	)
}
