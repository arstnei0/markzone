import { Button, TextField } from "@suid/material"
import { Component, createSignal } from "solid-js"
import { useNavigate } from "solid-start"
import { withDash } from "~/utils/dash"
import { trpc } from "~/utils/trpc"

export const [routeData, NewPagePage] = withDash(() => {
	const [content, setContent] = createSignal("")
	const [title, setTitle] = createSignal("")
	const navigate = useNavigate()
	const newPage = trpc.page.new.useMutation({
		onSuccess(data, variables, context) {
            navigate(`/dash/success/${data.id}`)
		},
	})

	return (
		<>
			<TextField
				value={title()}
				onChange={(e) => {
					setTitle((e.target as any).value)
				}}
                variant="standard"
                label="Page Title"
			></TextField>
            <br />
			<textarea
				value={content()}
				onInput={(e) => setContent((e.target as any).value)}
                width="400px"
                placeholder="Page Content"
			/>
            <br />
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
})

export default NewPagePage
