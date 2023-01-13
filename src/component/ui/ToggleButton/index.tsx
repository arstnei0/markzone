import type { JSX } from "solid-js"
import { For } from "solid-js"
import { Button } from "../Button"
import "./togglebutton.css"

export function ToggleButton<
	T extends string | number | symbol,
	M extends Record<T, JSX.Element>
>(props: { value: T; onChange: (value: T) => void; map: M }) {
	return (
		<div class="toggle-button-group">
			<For each={Object.entries(props.map) as [T, JSX.Element][]}>
				{([val, el]) => (
					<>
						<Button
							classList={{
								"toggle-button": true,
							}}
                            variant={val === props.value ? 'contained' : 'text'}
							onClick={() => {
								props.onChange(val)
							}}
						>
							{el}
						</Button>
					</>
				)}
			</For>
		</div>
	)
}
