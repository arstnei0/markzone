import type { Component } from "solid-js"
import { useNavigate } from "solid-start"
import { Button } from "~/component/ui/Button"

const Home: Component = () => {
	return (
		<>
			<Button
				onPress={() => {
					useNavigate()("/dashboard")
				}}
			>
				Dashboard
			</Button>
		</>
	)
}

export default Home
