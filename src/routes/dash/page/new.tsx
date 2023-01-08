import { Button, TextField } from "@suid/material"
import { Component, createSignal } from "solid-js"
import { useNavigate } from "solid-start"
import { trpc } from "~/utils/trpc"

const NewPagePage: Component = () => {
	const [content, setContent] = createSignal("")
	const [title, setTitle] = createSignal("")
	const navigate = useNavigate()
	const newPage = trpc.page.new.useMutation({
		onSuccess(data, variables, context) {
			navigate("/dash/board")
		},
	})

	return (
		<>
			<TextField
				value={title()}
				onChange={(e) => {
					setTitle((e.target as any).value)
				}}
			></TextField>
			<textarea
				value={content()}
				onInput={(e) => setContent((e.target as any).value)}
			/>
			<Button
				variant="contained"
				onClick={() => {
					newPage.mutate({
						content: content(),
						title: title(),
					})
				}}
			>
				Create
			</Button>
		</>
	)
}

export default NewPagePage
