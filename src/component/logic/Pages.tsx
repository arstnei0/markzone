import type { Component } from "solid-js"
import { createSignal } from "solid-js"
import { For } from "solid-js"
import { Show } from "solid-js"
import { trpc } from "~/utils/trpc"
import "./Pages.css"
import { getFullPageLink, getPageLink } from "~/lib/page"
import { List, ListItem } from "~/component/ui/List"
import { Button } from "~/component/ui/Button"
import { Dialog } from "~/component/ui/Dialog"

export const Pages: Component = () => {
	const [shareDialogOpen, setShareDialogOpen] = createSignal(false)
	const pages = trpc.page.all.useQuery()
	const deletePage = trpc.page.delete.useMutation({
		onSuccess() {
			pages.refetch()
		},
	})

	return (
		<div id="page-list">
			<Show
				when={pages.isLoading}
				fallback={
					<List>
						<For each={pages.data}>
							{(page) => (
								<ListItem>
									<div class="page-item">
										<a href={getPageLink(page.id)}>
											<div class="page-title">
												{page.title}
											</div>
										</a>
										<div class="page-actions">
											<Button round variant="text">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1em"
													height="1em"
													viewBox="0 0 24 24"
												>
													<path
														fill="currentColor"
														d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-4.025q0-.425-.287-.7Q12.425 11 12 11t-.712.287Q11 11.575 11 12v4.025q0 .425.288.7q.287.275.712.275Zm0-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"
													/>
												</svg>
											</Button>
											<Button round variant="text">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1em"
													height="1em"
													viewBox="0 0 24 24"
												>
													<path
														fill="currentColor"
														d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"
													/>
												</svg>
											</Button>
											<Button
												round
												variant="text"
												onPress={() => {
													deletePage.mutate(page.id)
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1em"
													height="1em"
													viewBox="0 0 24 24"
												>
													<path
														fill="currentColor"
														d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6q-.425 0-.713-.287Q4 5.425 4 5t.287-.713Q4.575 4 5 4h4q0-.425.288-.713Q9.575 3 10 3h4q.425 0 .713.287Q15 3.575 15 4h4q.425 0 .712.287Q20 4.575 20 5t-.288.713Q19.425 6 19 6v13q0 .825-.587 1.413Q17.825 21 17 21ZM7 6v13h10V6Zm2 10q0 .425.288.712Q9.575 17 10 17t.713-.288Q11 16.425 11 16V9q0-.425-.287-.713Q10.425 8 10 8t-.712.287Q9 8.575 9 9Zm4 0q0 .425.288.712q.287.288.712.288t.713-.288Q15 16.425 15 16V9q0-.425-.287-.713Q14.425 8 14 8t-.712.287Q13 8.575 13 9ZM7 6v13V6Z"
													/>
												</svg>
											</Button>
											<Button
												round
												variant="text"
												onPress={() => {
													setShareDialogOpen(true)
												}}
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1em"
													height="1em"
													viewBox="0 0 24 24"
												>
													<path
														fill="currentColor"
														d="M12 16q-.425 0-.712-.288Q11 15.425 11 15V4.825l-.9.9Q9.825 6 9.413 6Q9 6 8.7 5.7q-.275-.3-.275-.713q0-.412.275-.687l2.6-2.6q.125-.125.313-.2q.187-.075.387-.075t.388.075q.187.075.312.2l2.6 2.6q.3.3.3.725t-.3.7Q15 6 14.588 6q-.413 0-.688-.275l-.9-.9V15q0 .425-.287.712Q12.425 16 12 16Zm-6 7q-.825 0-1.412-.587Q4 21.825 4 21V10q0-.825.588-1.413Q5.175 8 6 8h2q.425 0 .713.287Q9 8.575 9 9t-.287.712Q8.425 10 8 10H6v11h12V10h-2q-.425 0-.712-.288Q15 9.425 15 9t.288-.713Q15.575 8 16 8h2q.825 0 1.413.587Q20 9.175 20 10v11q0 .825-.587 1.413Q18.825 23 18 23Z"
													/>
												</svg>
											</Button>

											<Dialog
												header={<h2>Share the page</h2>}
												content={
													<div class="share-buttons">
														<Button
															variant="contained"
															onPress={() => {
																navigator.clipboard.writeText(
																	getFullPageLink(
																		page.id
																	)
																)
															}}
														>
															Copy page link
														</Button>
														<a
															href={`http://twitter.com/share?text=I%20published%20a%20new%20article%20on%20Markzone%21%20&url=${getFullPageLink(
																page.id
															)}&hashtags=markzone`}
															target="_blank"
														>
															<Button variant="outlined">
																Share on Twitter
															</Button>
														</a>
													</div>
												}
												open={shareDialogOpen()}
												close={() =>
													setShareDialogOpen(false)
												}
											/>
										</div>
									</div>
								</ListItem>
							)}
						</For>
					</List>
				}
			>
				<></>
			</Show>
		</div>
	)
}
