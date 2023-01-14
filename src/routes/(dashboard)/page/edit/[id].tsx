/* eslint-disable @typescript-eslint/no-explicit-any */
import { For, createSignal, Show, lazy, Suspense } from "solid-js"
import { useNavigate } from "solid-start"
import { Button } from "~/component/ui/Button"
import { Form, FormItem } from "~/component/ui/Form"
import { Select } from "~/component/ui/Select"
import { TextField } from "~/component/ui/TextField"
import type { ThemeName } from "~/theme/theme"
import { themeNames } from "~/theme/theme"
import { withDash } from "~/utils/dash"
import { trpc } from "~/utils/trpc"
import "~/styles/new.css"
import { PageType } from "@prisma/client"
import { ToggleButton } from "~/component/ui/ToggleButton"

export const [routeData, NewPagePage] = withDash(() => {
	const [content, setContent] = createSignal("")
	const [title, setTitle] = createSignal("")
	const [theme, setTheme] = createSignal<ThemeName>("default")
	const [pageType, setPageType] = createSignal<PageType>(PageType.Markdown)
	const Editor = lazy(async () => ({
		default: (await import("~/component/editor/Editor")).Editor,
	}))

	const navigate = useNavigate()
	const newPage = trpc.page.new.useMutation({
		onSuccess(data) {
			navigate(`/page/success/${data.id}`)
		},
	})

	return (
		<>
			<div id="new-page">
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
						<ToggleButton
							value={pageType()}
							onChange={setPageType}
							map={{
								[PageType.Markdown]: <>Markdown</>,
								[PageType.Html]: <>Rich text</>,
							}}
						/>
					</FormItem>
					<FormItem>
						<Show
							when={pageType() === PageType.Markdown}
							fallback={
								<Suspense>
									<Editor
										content={content}
										setContent={setContent}
									/>
								</Suspense>
							}
						>
							<textarea
								class="page-content"
								value={content()}
								onInput={(e) =>
									setContent((e.target as any).value)
								}
								placeholder="Page Content"
							/>
						</Show>
					</FormItem>
					<FormItem>
						<div class="field-with-label">
							<label for="theme">Choose a theme</label>
							<Select
								value={theme()}
								onChange={(e) =>
									setTheme((e.target as any).value)
								}
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
						</div>
					</FormItem>
					<FormItem>
						<Button
							variant="contained"
							onClick={() => {
								newPage.mutate({
									content: content(),
									title: title(),
									theme: theme(),
									type: pageType(),
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

