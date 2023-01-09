import type { Component } from "solid-js"
import { signIn } from "@auth/solid-start/client"

const LoginPage: Component = () => {
	return (
		<>
			<button onClick={() => signIn("google")}>Login with Google</button>
			<button onClick={() => signIn("github")}>Login with Github</button>
		</>
	)
}

export default LoginPage
