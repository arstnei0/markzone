import { Button } from "@suid/material"
import { Component } from "solid-js"
import { signIn } from "@auth/solid-start/client"

const LoginPage: Component = () => {
	return (
		<>
            <Button onClick={() => signIn("google")}>Login with Google</Button>
            <Button onClick={() => signIn("github")}>Login with Github</Button>
		</>
	)
}

export default LoginPage
