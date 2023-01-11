/* eslint-disable @typescript-eslint/no-explicit-any */
import { For, createSignal } from "solid-js"
import { useNavigate } from "solid-start"
import { Button } from "~/component/ui/Button"
import { Form, FormItem } from "~/component/ui/Form"
import { Select } from "~/component/ui/Select"
import { TextField } from "~/component/ui/TextField"
import type { ThemeName } from "~/theme/theme"
import { themeNames } from "~/theme/theme"
import { withDash } from "~/utils/dash"
import { trpc } from "~/utils/trpc"

export const [routeData, NewPagePage] = withDash(() => {
	const [content, setContent] = createSignal("")
	const [title, setTitle] = createSignal("")
	const [theme, setTheme] = createSignal<ThemeName>("default")
	const navigate = useNavigate()
	const newPage = trpc.page.new.useMutation({
		onSuccess(data) {
			navigate(`/page/success/${data.id}`)
		},
	})

	return (
		<>
			<div>
				<h1>Create a new page</h1>
				<Form>
					<FormItem>
						<TextField
							label="Title"
							value={title()}
							onChange={(e) => {
								setTitle((e.target as any).value)
							}}
						/>
					</FormItem>
					<FormItem>
						<textarea
							value={content()}
							onInput={(e) => setContent((e.target as any).value)}
							placeholder="Page Content"
						/>
					</FormItem>
					<FormItem>
						<label for="theme">Choose a theme</label>
                        <br />
						<Select
							value={theme()}
							onChange={(e) => setTheme((e.target as any).value)}
							id="theme"
						>
							<For each={themeNames}>
								{(themeName) => (
									<option value={themeName}>
										{themeName}
									</option>
								)}
							</For>
						</Select>
					</FormItem>
					<FormItem>
						<Button
							variant="contained"
							onClick={() => {
								newPage.mutate({
									content: content(),
									title: title(),
									theme: theme(),
								})
							}}
						>
							Create
						</Button>
					</FormItem>
				</Form>
			</div>
		</>
	)
})

export default NewPagePage
