/* eslint-disable @typescript-eslint/no-explicit-any */
import { For, createSignal } from "solid-js"
import { useNavigate } from "solid-start"
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
			navigate(`/dash/success/${data.id}`)
		},
	})

	return (
		<>
			<input
				value={title()}
				onChange={(e) => {
					setTitle((e.target as any).value)
				}}
			/>
			<br />
			<textarea
				value={content()}
				onInput={(e) => setContent((e.target as any).value)}
				placeholder="Page Content"
			/>
			<br />
			<label for="theme">Choose a theme</label>
			<br />
			<select
				value={theme()}
				onChange={(e) => setTheme((e.target as any).value)}
				id="theme"
			>
				<For each={themeNames}>
					{(themeName) => (
						<option value={themeName}>{themeName}</option>
					)}
				</For>
			</select>
			<br />
			<button
				onClick={() => {
					newPage.mutate({
						content: content(),
						title: title(),
						theme: theme(),
					})
				}}
			>
				Create
			</button>
		</>
	)
})

export default NewPagePage
